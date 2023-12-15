import React, { useContext, useEffect, useRef, useState } from "react";
import Calendar from "../toolbox/Calendar";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import { FlightTypeContext } from "../context/CustomContext";
import { fixMonth, getDate } from "../toolbox/Tools";

const DropDown = ({
  className,
  placeholder,
  isFocus,
  setIsFocus,
  value,
  disabled = false,
}) => {
  const btnRef = useRef();

  useEffect(() => {
    const element = document.getElementById("datepicker-dropdown");
    const clickOutside = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        !element.contains(e.target)
      ) {
        setIsFocus(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  return (
    <Tooltip title="Disabled" disableHoverListener={!disabled} arrow>
      <div
        onClick={() => {
          if (disabled) return;
          setIsFocus(!isFocus);
        }}
        data-disabled={disabled}
        className={
          "w-full h-full p-2 z-[1] rounded-md data-[disabled=true]:opacity-50 " +
          className
        }
      >
        <div
          ref={btnRef}
          data-focus={isFocus}
          className="w-full rounded-md items-end flex data-[focus=true]:outline data-[focus=true]:outline-[3px] data-[focus=true]:outline-blue h-full px-2 py-1 relative"
        >
          <span
            data-focus={isFocus}
            data-empty={!!value}
            className="data-[focus=true]:top-3 data-[empty=true]:top-3 pointer-events-none select-none data-[focus=true]:text-xs data-[empty=true]:text-xs absolute top-1/2 -translate-y-1/2 text-xl duration-100 z-[2]"
          >
            {placeholder}
          </span>
          <span className="pb-[0.10rem] truncate">{value}</span>
        </div>
      </div>
    </Tooltip>
  );
};

function DatePickerSelection({ setParentValue = function (value) {} }) {
  const [departFocus, setDepartFocus] = useState(false);
  const [returnFocus, setReturnFocus] = useState(false);
  const [departValue, setDepartValue] = useState(() => {
    const date = new Date();
    return `${fixMonth(
      date.getMonth() + 1
    )} ${date.getDate()}, ${date.getFullYear()}`;
  });
  const [returnValue, setReturnValue] = useState("");
  const [side, setSide] = useState("depart");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs(getDate()));
  const flightTypeContext = useContext(FlightTypeContext);

  useEffect(() => {
    if (departFocus || returnFocus) {
      setIsOpen(true);
      if (departFocus) {
        setSide("depart");
      } else if (returnFocus) {
        setSide("return");
      }
    } else {
      setIsOpen(false);
    }
  }, [departFocus, returnFocus]);

  useEffect(() => {
    const value = `${fixMonth(selectedDate.$M + 1)} ${selectedDate.$D}, ${
      selectedDate.$y
    }`;
    switch (side) {
      case "depart":
        setDepartValue(value);
        break;
      case "return":
        setReturnValue(value);
        break;
    }
    setParentValue({ side: side, date: value });
  }, [selectedDate]);

  return (
    <div className="w-full h-20 z-[18] md:mt-0 mt-2 select-none rounded-lg flex flex-col relative border-2 border-blue items-center cursor-pointer p-1">
      <div className="w-full h-full grid grid-cols-2 gap-1">
        <DropDown
          value={departValue}
          setValue={setDepartValue}
          isFocus={departFocus}
          setIsFocus={setDepartFocus}
          placeholder="Depart"
          className="border-r-2 border-r-blue"
        />
        <DropDown
          disabled={flightTypeContext.value === "one_way"}
          value={returnValue}
          setValue={setDepartValue}
          isFocus={returnFocus}
          setIsFocus={setReturnFocus}
          placeholder="Return"
          className="border-l-2 border-l-blue"
        />
      </div>
      <div
        id="datepicker-dropdown"
        data-open={isOpen}
        className="w-fit data-[open=true]:block hidden h-fit bg-white shadow-md border border-slate-200 rounded-md absolute top-[95%]"
      >
        <Calendar
          value={selectedDate}
          setValue={(value) => setSelectedDate(dayjs(value))}
        />
      </div>
    </div>
  );
}

export default DatePickerSelection;
