import React, { useContext, useEffect, useId, useState } from "react";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PasswordField from "../toolbox/PasswordField";
import Checkbox from "@mui/material/Checkbox";
import CustomLink from "../toolbox/CustomLink";
import Footer from "./Footer";
import MiniBanner from "../toolbox/MiniBanner";
import Content from "../toolbox/Content";
import CustomTextField from "../toolbox/CustomTextField";
import EmailField from "../toolbox/EmailField";
import { fixMonth } from "../toolbox/Tools";
import { RegistrationAlertBoxContext } from "../context/CustomContext";
import axios from "axios";
import { Button } from "semantic-ui-react";

function RegistratingPage() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const checkboxId = useId();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const popupContext = useContext(RegistrationAlertBoxContext);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "instant",
    });
  }, [window.location.href]);

  const popupMessage = (title, message, error = true) => {
    popupContext.setValue((curr) => ({
      ...curr,
      state: true,
      message: message,
      error: error,
      title: title,
    }));
  };

  const submitEventHandler = () => {
    let cont = 0;
    const datas = [
      {
        label: "First name",
        data: firstName,
      },
      {
        label: "Last name",
        data: lastName,
      },
      {
        label: "Gender",
        data: gender,
      },
      {
        label: "Date of birth",
        data: birthDate,
      },
      {
        label: "Phone Number",
        data: phone,
      },
    ];
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].data == "") {
        popupMessage(
          `Invalid ${datas[i].label}`,
          `${datas[i].label} cannot be empty.`
        );
        break;
      }
      cont++;
    }
    if (cont === 5) {
      if (phone.length !== 12 && phone.length !== 13) {
        popupMessage(
          "Invalid phone number",
          "Please enter your valid phone number."
        );
        return;
      }

      if (!emailAddress) {
        popupMessage(
          "Invalid email address",
          "Please enter your email address."
        );
        return;
      } else if (emailAddress.includes("@gmail.com")) {
        if (emailAddress.split("@")[0].length <= 2) {
          popupMessage(
            "Incorrect email format",
            "The email address should have a length greater than 2 characters."
          );
          return;
        } else if (emailAddress.split("@")[0].length >= 20) {
          popupMessage(
            "Incorrect email format",
            "The email address should not exceed 20 characters."
          );
          return;
        }
      } else {
        popupMessage(
          "Incorrect email format",
          "Please specify the correct format (e.g., example@gmail.com)."
        );
        return;
      }
      if (!password) {
        popupMessage("Invalid password", "Please enter your password.");
        return;
      }
      if (password.length <= 5) {
        popupMessage(
          "Password is too short",
          " It must be at least 5 characters long."
        );
        return;
      }
      if (!/\d/.test(password)) {
        popupMessage(
          "Invalid password",
          "Password must contain at least one number."
        );
        return;
      }
      if (!confirmPassword) {
        popupMessage(
          "Invalid confirm password",
          "Enter confirm password that matches the first password."
        );
        return;
      }
      if (password !== confirmPassword) {
        popupMessage(
          "Password mismatch",
          "Kindly ensure both passwords are the same."
        );
        return;
      }
      if (!privacyCheck) {
        popupMessage(
          "Invalid",
          "Please check and agree to the terms and privacy policy."
        );
        return;
      }
      // here kapag correct na

      const data = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDate: birthDate,
        phoneNumber: phone,
        email: emailAddress,
        password: password,
      };
      setIsLoading(true);
      axios
        .put("http://localhost:8081/mia/api/insert-user-account", data)
        .then((value) => {
          popupMessage(value.data.title, value.data.message);
          setIsLoading(false);
        })
        .catch((err) => {
          popupMessage(
            "Server Error",
            "The server is currently offline. Please try again later."
          );
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Header />
      <MiniBanner img="/banners/registration.jpg" />
      <Content title="Registration Form">
        <p className="text-2xl text-main pb-5">
          For existing members, please fill-out the form below to create your
          password and be able to access your account online. For non-members,
          you may enroll through www.philippineairlines.com/enrollment-page.
        </p>
        <p className="text-xl text-slate-500 font-montserrat-italic pb-10">
          All fields are required unless specified. Please enter your first
          name, last name, date of birth as they appear on your passport.
        </p>
        <div className="w-full flex flex-col gap-y-4 mb-10">
          <p className="text-xl font-montserrat-bold text-main">
            Personal Information
          </p>
          <div className="w-full grid grid-cols-2 gap-x-3">
            <CustomTextField
              placeholder="First name"
              value={firstName}
              setValue={setFirstName}
              required
            />
            <CustomTextField
              placeholder="Last name"
              value={lastName}
              setValue={setLastName}
              required
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 items-center">
            <FormControl fullWidth>
              <InputLabel
                style={{ paddingRight: 10, backgroundColor: "white" }}
                id="select-gender"
              >
                Gender
              </InputLabel>
              <Select
                labelId="select-gender"
                value={gender}
                label="Age"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(value, context) =>
                    setBirthDate(
                      `${fixMonth(value.$M + 1)} ${value.$D}, ${value.$y}`
                    )
                  }
                  className="w-full"
                  label="Date of birth"
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <PhoneInput
              containerStyle={{ height: 53 }}
              inputStyle={{
                height: 53,
                width: "100%",
                fontFamily: "Montserrat-regular",
              }}
              autoFormat
              placeholder="Mobile number"
              containerClass="w-full"
              country="ph"
              value={phone}
              onChange={(value) => setPhone(value)}
            />
            <div></div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-xl font-montserrat-bold text-main">
            Account Information
          </p>
          <div className="w-full grid grid-cols-2 gap-x-3">
            <EmailField
              value={emailAddress}
              setValue={setEmailAddress}
              placeholder="Email address"
              required
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 mb-2">
            <PasswordField
              value={password}
              setValue={setPassword}
              placeholder="Password"
            />
            <PasswordField
              value={confirmPassword}
              setValue={setConfirmPassword}
              placeholder="Re-enter password"
            />
          </div>
          <div className="w-full flex items-center">
            <Checkbox
              checked={privacyCheck}
              onChange={(e) => setPrivacyCheck(e.target.checked)}
              id={checkboxId}
              size="medium"
              className=""
            />
            <label htmlFor={checkboxId} className="text-lg select-none">
              I have read and agree to the <CustomLink>Terms</CustomLink> and{" "}
              <CustomLink>Data Privacy Policy</CustomLink> of MIA Airlines.
            </label>
          </div>
          <div className="w-full text-end">
            <Button
              primary
              size="big"
              circular
              onClick={submitEventHandler}
              loading={isLoading}
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
}

export default RegistratingPage;
