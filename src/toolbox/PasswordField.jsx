import React, { useEffect, useId, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function PasswordField({
  value = "",
  setValue = () => {},
  tabIndex = 2,
  placeholder = "Placeholder",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const id = useId();
  const [first, setFirst] = useState(false);

  useEffect(() => {
    if (value) {
      if (value.length <= 5) {
        setIsError(true);
        setHelperText("Invalid password length");
      } else {
        setIsError(false);
      }
    } else {
      setIsError(true);
      setHelperText("This field is required");
    }
  }, [value]);

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel className="bg-white" error={isError && first} htmlFor={id}>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        tabIndex={tabIndex}
        error={isError && first}
        id={id}
        type={showPassword ? "text" : "password"}
        onChange={(e) => {
          setValue((c) => e.target.value);
          if (!first) setFirst(true);
        }}
        onBlur={() => {
          if (value) {
            if (value.length <= 5) {
              setIsError(true);
              setHelperText("Invalid password length");
            } else {
              setIsError(false);
            }
          } else {
            setIsError(true);
            setHelperText("This field is required");
          }
          if (!first) setFirst(true);
        }}
        value={value}
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
      {isError && first && (
        <FormHelperText error id="component-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default PasswordField;
