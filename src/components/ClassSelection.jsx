import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function ClassSelection({ value, setValue }) {
  const [isFocus, setIsFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const classRef = useRef();
  const dropdownRef = useRef();

  const [classItems, setClassItems] = useState([
    {
      key: 1,
      label: "Economy",
      selected: false,
    },
    {
      key: 2,
      label: "Premium Economy",
      selected: false,
    },
    {
      key: 3,
      label: "Business",
      selected: false,
    },
  ]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        dropdownRef.current &&
        !classRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setIsFocus(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  return (
    <div
      onClick={(e) => {
        setIsOpen(!isOpen);
        setIsFocus(!isFocus);
      }}
      className="w-full h-20 z-[17] select-none rounded-lg flex gap-1 justify-between relative border-2 px-5 border-blue items-center cursor-pointer"
    >
      <div
        ref={classRef}
        className="w-full h-full flex items-center justify-between"
      >
        <div className="w-full rounded-md flex items-center data-[focus=true]:outline data-[focus=true]:outline-[3px] data-[focus=true]:outline-blue h-full py-1 relative">
          <span
            data-focus={isFocus}
            data-empty={!!value}
            className="data-[focus=true]:top-7 data-[empty=true]:top-7 pointer-events-none select-none data-[focus=true]:text-xs data-[empty=true]:text-xs absolute top-1/2 -translate-y-1/2 text-xl duration-100 z-[2]"
          >
            Select Class
          </span>
          <span className="translate-y-3 text-lg">{value}</span>
        </div>
        <span>
          <FaChevronDown
            data-open={isOpen}
            className="w-5 h-5 data-[open=true]:rotate-180 text-blue"
          />
        </span>
      </div>
      <ul
        ref={dropdownRef}
        data-open={isOpen}
        className="w-[95%] hidden shadow-md rounded-md h-fit bg-white border border-slate-200 absolute data-[open=true]:flex flex-col py-2 top-[90%] left-1/2 -translate-x-1/2"
      >
        {classItems.map((data) => (
          <li
            onClick={() => {
              setClassItems((curr) => {
                return curr.map((raw) => {
                  if (raw.key === data.key) return { ...raw, selected: true };
                  return { ...raw, selected: false };
                });
              });
              setValue(data.label);
            }}
            key={data.key}
            data-select={data.selected}
            className="relative z-[2] data-[select=true]:bg-slate-200 flex justify-between w-full hover:bg-slate-200 py-4 px-5"
          >
            {data.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassSelection;
