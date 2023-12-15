import React, { useEffect, useState } from "react";
import CustomTextField from "./CustomTextField";
import { TextField } from "@mui/material";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CgSpinnerTwo } from "react-icons/cg";

function TextToField({
  value = "",
  setValue = () => {},
  placeholder = "",
  edit,
  type = "text",
  onChange = (text) => {},
  loading,
}) {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const convertToPassword = (password) => {
    const len = password.length;
    let temp = "";
    for (let i = 0; i < len; i++) {
      temp += "*";
    }
    return temp;
  };

  if (type === "password") {
    return (
      <div className="w-full flex flex-col mb-2">
        {edit ? (
          <label className="text-sm font-montserrat text-slate-500">
            {placeholder}
          </label>
        ) : (
          <p className="text-sm font-montserrat text-slate-500">
            {placeholder}
          </p>
        )}
        <div className="flex items-center gap-x-1">
          {edit ? (
            <input
              className="w-[calc(100%-1.5rem)] flex items-center text-xl outline-none border-b-2 border-b-black py-1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              type={isHidden ? "password" : "text"}
            />
          ) : (
            <div className="w-[calc(100%-1.5rem)] h-[30px] flex items-center rounded-md text-xl py-1">
              <div className="truncate">
                {isHidden ? convertToPassword(value) : value}
              </div>
            </div>
          )}
          {loading && <CgSpinnerTwo className="w-6 h-6 animate-spin" />}
          <button onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? (
              <IoEyeOff className="w-6 h-6 text-[#333]" />
            ) : (
              <IoEye className="w-6 h-6 text-[#333]" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col mb-2">
      {edit ? (
        <label className="text-sm font-montserrat text-slate-500">
          {placeholder}
        </label>
      ) : (
        <p className="text-sm font-montserrat text-slate-500">{placeholder}</p>
      )}
      {edit ? (
        <input
          className="w-full flex items-center text-xl outline-none border-b-2 border-b-black py-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          type={type}
        />
      ) : (
        <div className="w-full h-[30px] flex items-center rounded-md text-xl py-1">
          <div className="truncate">{value ? value : "Empty"}</div>
        </div>
      )}
    </div>
  );
}

export default TextToField;
