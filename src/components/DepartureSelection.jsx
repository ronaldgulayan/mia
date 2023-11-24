import React, { useEffect, useRef, useState } from "react";
import Calendar from "../toolbox/Calendar";
import { fixMonth } from "../toolbox/Tools";
import dayjs from "dayjs";

const fixDate = (date) => {
  return `${fixMonth(date.$M + 1)} ${date.$D}, ${date.$y}`;
};

function DepartureSelection({ setParentValue = (value) => {} }) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const btnRef = useRef();
  const dropdownRef = useRef();

  const [calendarValue, setCalendarValue] = useState(() => {
    const date = new Date();
    return dayjs(
      `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    );
  });

  useEffect(() => {
    setValue(() => {
      return fixDate(calendarValue);
    });
    setParentValue(fixDate(calendarValue));
  }, [calendarValue]);

  useEffect(() => {
    const clickOutside = (e) => {
      const t = e.target;
      if (
        btnRef.current &&
        dropdownRef.current &&
        !btnRef.current.contains(t) &&
        !dropdownRef.current.contains(t)
      ) {
        setIsFocus(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  return (
    <div className="w-full h-20 select-none rounded-lg flex flex-col relative border-2 border-blue items-center cursor-pointer p-1">
      <div className="w-full h-full relative z-[2]">
        <div
          onClick={() => setIsFocus(!isFocus)}
          className="w-full h-full p-2 rounded-md"
        >
          <div
            ref={btnRef}
            data-focus={isFocus}
            className="w-full rounded-md items-center flex data-[focus=true]:outline data-[focus=true]:outline-[3px] data-[focus=true]:outline-blue h-full px-2 py-1 relative"
          >
            <span
              data-focus={isFocus}
              data-empty={!!value}
              className="data-[focus=true]:top-4 data-[empty=true]:top-4 pointer-events-none select-none data-[focus=true]:text-xs data-[empty=true]:text-xs absolute top-1/2 -translate-y-1/2 text-xl duration-100"
            >
              Depart
            </span>
            <span className="pt-5 text-lg">{value}</span>
          </div>
        </div>
      </div>
      <div
        ref={dropdownRef}
        data-open={isFocus}
        className="w-[95%] data-[open=true]:block hidden h-fit bg-white absolute top-[90%] border border-slate-200 shadow-md z-[3] rounded-md"
      >
        <Calendar value={calendarValue} setValue={setCalendarValue} />
      </div>
    </div>
  );
}

export default DepartureSelection;
