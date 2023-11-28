import React, { useEffect, useId, useState } from "react";
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

function RegistratingPage() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const checkboxId = useId();

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div id="haha" className="w-full h-[70dvh]">
        <img src="/banners/img-6.jpg" className="h-full w-full object-cover" />
      </div>
      <div className="w-full min-h-screen py-pad px-[10rem] flex flex-col">
        <p
          onClick={() => {
            const element = document.getElementById("haha");
            const { width, height } = element.getBoundingClientRect();
            console.log(width, height);
          }}
          className="font-montserrat-black pb-[4rem] text-5xl text-blue-800"
        >
          Register Form
        </p>
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
            <TextField
              autoComplete="off"
              label="First name"
              variant="outlined"
              style={{ fontFamily: "Montserrat-regular" }}
            />
            <TextField
              autoComplete="off"
              label="Last name"
              variant="outlined"
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="w-full" label="Date of birth" />
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
              // dropdownStyle={{ bottom: "100%" }}
            />
            <div></div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-xl font-montserrat-bold text-main">
            Account Information
          </p>
          <div className="w-full grid grid-cols-2 gap-x-3">
            <TextField
              autoComplete="off"
              type="text"
              variant="outlined"
              helperText="The email address should be unique and must be active."
              fullWidth
              label="Email address"
              color="primary"
            />
            <div></div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 mb-2">
            <PasswordField
              value={password}
              setValue={setPassword}
              placeholder="Password"
            />
            <PasswordField
              value={password}
              setValue={setPassword}
              placeholder="Re-enter password"
            />
          </div>
          <div className="w-full flex items-center">
            <Checkbox id={checkboxId} size="medium" className="" />
            <label htmlFor={checkboxId} className="text-lg select-none">
              I have read and agree to the <CustomLink>Terms</CustomLink> and{" "}
              <CustomLink>Data Privacy Policy</CustomLink> of MIA Airlines.
            </label>
          </div>
          <div className="w-full text-end">
            <button className="px-6 py-3 text-xl bg-main hover:bg-main-hover active:bg-main-active text-white rounded-full">
              Submit
            </button>
          </div>
        </div>
        {/* <div className="w-full h-96 mt-10 bg-main"></div> */}
      </div>
      <Footer />
    </div>
  );
}

export default RegistratingPage;
