import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Button from "@mui/material/Button";

function SigninPopup() {
  const [email, setEmail] = useState({
    value: "",
    error: false,
    helper: "This field is required",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    helper: "This field is required",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full z-[10] bg-[#0009] backdrop-blur-sm shadow-md h-screen fixed left-0 top-0 flex justify-center pt-32">
      <div className="w-[30rem] h-fit bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-16 border-b border-b-slate-300 flex justify-between items-center px-5">
          <p className="font-bold text-black text-xl">Signin</p>
          <button>
            <IoMdClose className="w-6 h-6 text-black opacity-70 hover:opacity-100 duration-100" />
          </button>
        </div>
        <div className="w-full h-fit p-5 flex flex-col gap-y-5">
          <TextField
            autoComplete="off"
            type="text"
            variant="outlined"
            helperText={email.error && email.helper}
            fullWidth
            label="Email address"
            color="primary"
            error={email.error}
            value={email.value}
            onChange={(e) => {
              setEmail((curr) => ({ ...curr, value: e.target.value }));
              setEmail((curr) => {
                if (curr.value) {
                  if (!curr.value.includes("@gmail.com")) {
                    return {
                      ...curr,
                      value: e.target.value,
                      error: true,
                      helper: "Incorrect email address format",
                    };
                  } else {
                    return {
                      ...curr,
                      value: e.target.value,
                      error: false,
                    };
                  }
                }
                return {
                  ...curr,
                  value: e.target.value,
                  error: true,
                  helper: "This field is required",
                };
              });
            }}
            onBlur={(e) => {
              setEmail((curr) => {
                if (!curr.value) {
                  return {
                    ...curr,
                    error: true,
                    helper: "This field is required",
                  };
                }
                if (!curr.value.includes("@gmail.com")) {
                  return {
                    ...curr,
                    error: true,
                    helper: "Incorrect email address format",
                  };
                } else {
                  return {
                    ...curr,
                    error: false,
                  };
                }
              });
            }}
          />
          <div className="w-full flex flex-col items-end gap-y-1">
            <button className="w-fit text-main hover:underline underline-offset-4">
              Forgot password
            </button>
            <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
              <InputLabel
                error={password.error}
                htmlFor="outlined-adornment-password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                error={password.error}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword((curr) => ({ ...curr, value: e.target.value }));
                  setPassword((curr) => {
                    if (curr.value) {
                      if (curr.value.length <= 5) {
                        return {
                          ...curr,
                          error: true,
                          helper: "Invalid password length",
                        };
                      }
                      return { ...curr, error: false };
                    }
                    return {
                      ...curr,
                      error: true,
                      helper: "This field is required",
                    };
                  });
                }}
                onBlur={() => {
                  setPassword((curr) => {
                    if (curr.value) {
                      if (curr.value.length <= 5) {
                        return {
                          ...curr,
                          error: true,
                          helper: "Invalid password length",
                        };
                      }
                      return { ...curr, error: false };
                    }
                    return {
                      ...curr,
                      error: true,
                      helper: "This field is required",
                    };
                  });
                }}
                value={password.value}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((curr) => !curr)}
                      edge="end"
                    >
                      {showPassword ? (
                        <MdVisibility className="w-5 h-5 text-inherit" />
                      ) : (
                        <MdVisibilityOff className="w-5 h-5 text-inherit" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {password.error && (
                <FormHelperText error id="component-helper-text">
                  {password.helper}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <Button fullWidth variant="contained" size="large">
            LOGIN
          </Button>
          <div>
            <p>
              Don't have an account?{" "}
              <button className="text-main cursor-pointer hover:underline underline-offset-4">
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPopup;