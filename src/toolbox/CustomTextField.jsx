import React, { useLayoutEffect, useState } from "react";
import TextField from "@mui/material/TextField";

function CustomTextField({
  placeholder = "Placeholder",
  required = false,
  value = "",
  setValue = (e) => {},
}) {
  const [first, setFirst] = useState(false);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    if (!value) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [value]);

  return (
    <TextField
      error={first && required && isError}
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBeforeInput={() => setFirst(true)}
      onBlur={() => {
        if (!value) {
          setFirst(true);
          setIsError(true);
        }
      }}
      autoComplete="off"
      label={placeholder + (required ? "*" : "")}
      variant="outlined"
      helperText={first && required && isError && "This field is required"}
    />
  );
}

export default CustomTextField;
