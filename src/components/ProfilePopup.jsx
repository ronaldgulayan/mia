import React, { useContext, useEffect, useState } from "react";
import CustomTextField from "../toolbox/CustomTextField";
import TextToField from "../toolbox/TextToField";
import { Button } from "semantic-ui-react";
import {
  ProfileContext,
  RegistrationAlertBoxContext,
} from "../context/CustomContext";

const NotField = ({ placeholder = "", value = "" }) => (
  <div className="w-full flex flex-col mb-2">
    <p className="text-sm font-montserrat text-slate-500">{placeholder}</p>
    <div className="w-full h-[30px] flex items-center rounded-md text-xl py-1">
      <div className="truncate">{value}</div>
    </div>
  </div>
);

function ProfilePopup() {
  const visibilityContext = useContext(ProfileContext);

  const [firstName, setFirstName] = useState("Ronald");
  const [lastName, setLastName] = useState("Gulayan");
  const [phone, setPhone] = useState("09384535499");
  const [password, setPassword] = useState("ronald02");
  const popupContext = useContext(RegistrationAlertBoxContext);

  const [edit, setEdit] = useState(false);

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
        popupMessage(
          "Invalid password",
          "The password is empty. Please enter your password first."
        );
        return;
      }
      if (password.length <= 5) {
        popupMessage(
          "Invalid password",
          "The length of the password should be greater than 5."
        );
        return;
      }
    }
    setEdit((value) => !value);
  };

  return (
    <div
      data-visibility={visibilityContext.value}
      className="w-full duration-200 z-[10] data-[visibility=true]:opacity-100 data-[visibility=true]:pointer-events-auto opacity-0 pointer-events-none bg-[#0009] backdrop-blur-sm shadow-md h-screen fixed left-0 top-0 flex justify-center pt-32"
    >
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
            <NotField placeholder="Gender" value="Male" />
            <NotField placeholder="Birth date" value="July 12, 2002" />
          </div>
          <div className="grid grid-cols-2 gap-x-2 ">
            <TextToField
              placeholder="Phone number"
              value={phone}
              setValue={setPhone}
              edit={edit}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2 ">
            <NotField placeholder="Email address" value="ron@gmail.com" />
            <TextToField
              placeholder="Password"
              value={password}
              setValue={setPassword}
              edit={edit}
              type="password"
            />
          </div>
          <div className="w-full flex justify-end">
            <Button icon="repeat" content="Reset" />
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
