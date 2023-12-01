import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

function EmailField({
  required = true,
  placeholder = "Placeholder",
  value = "",
  setValue = (e) => {},
  tabIndex = 1,
}) {
  const [first, setFirst] = useState(false);

  const [properties, setProperties] = useState({
    error: false,
    helperText: "",
  });

  useEffect(() => {
    if (value) {
      if (!value.includes("@gmail.com")) {
        setProperties((curr) => {
          return {
            ...curr,
            error: true,
            helperText: "Incorrect email address format",
          };
        });
      } else if (value.split("@")[0].length < 3) {
        setProperties((curr) => {
          return {
            ...curr,
            error: true,
            helperText: "Invalid email length",
          };
        });
      } else {
        setProperties((curr) => {
          return { ...curr, error: false };
        });
      }
    } else {
      setProperties((curr) => {
        return {
          ...curr,
          error: true,
          helperText: "This field is required",
        };
      });
    }
  }, [value]);

  return (
    <TextField
      tabIndex={tabIndex}
      error={first && required && properties.error}
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(() => e.target.value);
      }}
      onBeforeInput={() => setFirst(true)}
      onBlur={() => {
        if (!value) {
          setFirst(true);
          setProperties((curr) => {
            return {
              ...curr,
              error: true,
              helperText: "This field is required",
            };
          });
        }
      }}
      autoComplete="off"
      label={placeholder + (required ? "*" : "")}
      variant="outlined"
      helperText={
        first && required && properties.error && properties.helperText
      }
    />
  );
}

export default EmailField;
