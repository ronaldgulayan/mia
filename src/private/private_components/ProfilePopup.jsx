import React, { useContext, useEffect, useId, useState } from "react";
import CustomTextField from "../../toolbox/CustomTextField";
import TextToField from "../../toolbox/TextToField";
import { Button } from "semantic-ui-react";
import {
  AccountInformationContext,
  RegistrationAlertBoxContext,
} from "../../context/CustomContext";
import {
  convertMonthToNumber,
  getAge,
  getGlobalUrl,
} from "../../functions/methods";
import { PrivateProfileContext } from "../private_context/PrivateContext";
import axios from "axios";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import useCookies from "../../hooks/useCookies";

const PasswordField = ({ value = "", setValue = (e) => {} }) => {
  const id = useId();
  const [isHidden, setIsHidden] = useState(true);

  const setIsHiddenPass = () => setIsHidden(!isHidden);
  return (
    <div className="flex flex-col w-full gap-y-1">
      <label
        htmlFor={id}
        className="text-sm font-montserrat-regular text-slate-600"
      >
        Enter your new password
      </label>
      <div className="w-full flex border px-3 border-slate-500 rounded-md overflow-hidden items-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          autoComplete="off"
          className="w-full h-12 outline-none text-base"
          placeholder="Enter your new password here..."
          type={isHidden ? "password" : "text"}
        />
        {isHidden ? (
          <MdVisibilityOff
            onClick={setIsHiddenPass}
            className="w-7 h-7 select-none cursor-pointer"
          />
        ) : (
          <MdVisibility
            onClick={setIsHiddenPass}
            className="w-7 h-7 select-none cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

const NotField = ({ placeholder = "", value = "" }) => (
  <div className="w-full flex flex-col mb-2">
    <p className="text-sm font-montserrat text-slate-500">{placeholder}</p>
    <div className="w-full h-[30px] flex items-center rounded-md text-xl py-1">
      <div className="truncate">{value}</div>
    </div>
  </div>
);

function ProfilePopup() {
  const visibilityContext = useContext(PrivateProfileContext);
  const privateContext = useContext(AccountInformationContext);

  const [firstName, setFirstName] = useState(privateContext.value.first_name);
  const [lastName, setLastName] = useState(privateContext.value.last_name);
  const [phone, setPhone] = useState(privateContext.value.phone_number);
  const [password, setPassword] = useState("password");
  const popupContext = useContext(RegistrationAlertBoxContext);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLoadingField, setIsLoadingField] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [edit, setEdit] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const { setCookie } = useCookies("token");

  const updateAccount = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      new_password: isValidPassword ? confirmationPassword : null,
    };
    axios
      .put(
        getGlobalUrl() + `/mia/api/update-account/${privateContext.value.id}`,
        data
      )
      .then((value) => {
        if (value.data.status === 500) {
          popupMessage("Error", "Something error, Please try again later.");
        }
        if (value.data.status === 200) {
          const token = value.data.token;
          axios
            .get(getGlobalUrl() + "/mia/api/decode-token/" + token)
            .then((value_docode) => {
              const decodedToken = value_docode.data.data;
              setIsSuccess(true);
              setCookie(value.data.token);
              privateContext.setValue(decodedToken);
              setConfirmationPassword("");
              setPassword("password");
            })
            .catch((err) => {
              console.log("error");
            });
        }
      });
  };

  const popupMessage = (title, message, error = true) => {
    popupContext.setValue((curr) => ({
      ...curr,
      state: true,
      message: message,
      error: error,
      title: title,
    }));
  };

  const saveEventHandler = () => {
    if (edit) {
      if (firstName == "" || firstName.length <= 1) {
        popupMessage(
          "Invalid first name",
          "The first name should not be empty and its length should not be less than 1."
        );
        return;
      }
      if (lastName == "" || lastName.length <= 1) {
        popupMessage(
          "Invalid last name",
          "The last name should not be empty and its length should not be less than 1."
        );
        return;
      }
      if (phone.length !== 11) {
        popupMessage(
          "Invalid phone #",
          "You entered an invalid phone number. The phone number should have a length of 11."
        );
        return;
      }
      if (password == "") {
        setPassword("password");
      } else if (password.length <= 5) {
        popupMessage(
          "Invalid password",
          "The length of the password should be greater than 5."
        );
        return;
      } else if (!isValidPassword && password !== "password") {
        popupMessage(
          "Password didn't match",
          "You entered the wrong password. just leave it empty if you don't want to change your password."
        );
        return;
      }
      if (isValidPassword && confirmationPassword == "") {
        popupMessage(
          "Invalid new password",
          "Please enter your new password first."
        );
        return;
      }
      if (isValidPassword && confirmationPassword.length <= 5) {
        popupMessage(
          "Invalid new password",
          "The length of the new password should be greater than 5."
        );
        return;
      }
      if (isValidPassword && !/\d/.test(confirmationPassword)) {
        popupMessage(
          "Invalid new password",
          "Password must contain at least one number."
        );
        return;
      }
      updateAccount();
    }
    setEdit((value) => !value);
  };

  const stringDateToNumber = (date) => {
    const month = date.split(" ")[0];
    const day = Number.parseInt(date.split(" ")[1].replace(",", ""));
    const year = Number.parseInt(date.split(", ")[1]);
    return { month, day, year };
  };

  const passwordEventHandler = async (text) => {
    text = text == "" ? "None" : text;

    setIsLoadingField(true);
    await axios
      .get(
        getGlobalUrl() +
          `/mia/api/password-validation/${text}/${privateContext.value.id}`
      )
      .then((value) => {
        setIsValidPassword(value.data.data);
        setIsLoadingField(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsValidPassword(false);
        setIsLoadingField(false);
      });
  };

  return (
    <div
      data-visibility={visibilityContext.value}
      className="w-full duration-200 z-[10] data-[visibility=true]:opacity-100 data-[visibility=true]:pointer-events-auto opacity-0 pointer-events-none bg-[#0009] backdrop-blur-sm shadow-md h-screen fixed left-0 top-0 flex justify-center pt-32"
    >
      <Snackbar
        open={isSuccess}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={() => setIsSuccess(false)}
      >
        <Alert variant="filled" severity="success" sx={{ width: 200 }}>
          Account update successful. 👍
        </Alert>
      </Snackbar>
      <div
        data-visibility={visibilityContext.value}
        className="w-[90%] md:w-[40rem] p-3 duration-200 -translate-y-10 data-[visibility=true]:translate-y-0 h-fit bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="w-full px-3 flex justify-between border-b border-b-slate-200p pt-2 pb-4 mb-2 items-center">
          <p className="font-montserrat-bold text-xl">Account</p>
          <button
            onClick={() => visibilityContext.setValue(false)}
            className="text-lg font-bold opacity-50 duration-100 hover:opacity-100"
          >
            &#10005;
          </button>
        </div>
        <div className="px-3 flex flex-col gap-y-2">
          <div className="grid grid-cols-2 gap-x-2 ">
            <TextToField
              placeholder="First name"
              value={firstName}
              setValue={setFirstName}
              edit={edit}
            />
            <TextToField
              placeholder="Last name"
              value={lastName}
              setValue={setLastName}
              edit={edit}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2 ">
            <NotField
              placeholder="Birth date"
              value={privateContext.value.birth_date}
            />
            <NotField
              placeholder="Age"
              value={(() => {
                const { month, day, year } = stringDateToNumber(
                  privateContext.value.birth_date
                );
                return getAge(convertMonthToNumber(month), day, year);
              })()}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2 ">
            <NotField
              placeholder="Gender"
              value={privateContext.value.gender}
            />
            <TextToField
              placeholder="Phone number"
              value={phone}
              setValue={setPhone}
              edit={edit}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <NotField
              placeholder="Email address"
              value={privateContext.value.email}
            />
            <TextToField
              onChange={passwordEventHandler}
              placeholder="Enter your correct password"
              value={password}
              setValue={setPassword}
              edit={edit}
              type="password"
              loading={isLoadingField}
            />
          </div>
          {isValidPassword && (
            <PasswordField
              value={confirmationPassword}
              setValue={setConfirmationPassword}
            />
          )}
          <div className="w-full flex justify-end">
            <Button
              onClick={() => {
                setFirstName(privateContext.value.first_name);
                setLastName(privateContext.value.last_name);
                setPhone(privateContext.value.phone_number);
                setPassword("password");
                setEdit(false);
              }}
              icon="repeat"
              content="Reset"
            />
            <Button onClick={saveEventHandler} color={edit ? "green" : "blue"}>
              {edit ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
