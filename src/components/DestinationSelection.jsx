import React, { useEffect, useId, useRef, useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import { places } from "../assets/places.json";
import { IoMdInformationCircle, IoMdClose } from "react-icons/io";

const DropDown = ({
  dropdownId,
  className = "",
  placeholder = "From",
  isFocus,
  setIsFocus,
  value,
  setValue,
  id,
  setSide,
  isOpen,
}) => {
  const inputRef = useRef();

  const clickEvent = () => {
    setIsFocus(true);
    setSide(id);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      const element = document.getElementById(dropdownId);
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        if (isFocus && element && !element.contains(e.target)) {
          setIsFocus(false);
        }
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, [isFocus]);

  return (
    <div className={"w-full h-full p-2 rounded-md " + className}>
      <div
        onClick={clickEvent}
        data-focus={isFocus}
        className="w-full rounded-md data-[focus=true]:outline data-[focus=true]:outline-[3px] data-[focus=true]:outline-blue h-full px-2 py-1 relative"
      >
        <span
          data-focus={isFocus}
          data-empty={!!value}
          className="data-[focus=true]:top-3 data-[empty=true]:top-3 pointer-events-none select-none data-[focus=true]:text-xs data-[empty=true]:text-xs absolute top-1/2 -translate-y-1/2 text-xl duration-100"
        >
          {placeholder}
        </span>
        <input
          onChange={setValue}
          value={value}
          ref={inputRef}
          data-focus={isFocus}
          className="w-full data-[focus=true]:cursor-text cursor-pointer h-full outline-none pt-4"
          type="text"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

// #########################################################################################
// #########################################################################################
// #########################################################################################

const SwitchButton = ({ onClick = () => {} }) => {
  const [isSwitch, setIsSwitch] = useState(false);
  useEffect(onClick, [isSwitch]);

  return (
    <HiSwitchHorizontal
      data-switch={isSwitch}
      onClick={() => setIsSwitch(!isSwitch)}
      className="w-12 h-12 data-[switch=true]:rotate-180 duration-150 absolute left-1/2  border-2 border-blue p-2 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800 cursor-pointer select-none"
    />
  );
};

// #########################################################################################
// #########################################################################################
// #########################################################################################

function DestinationSelection({ z = 3, setParentValue = function (value) {} }) {
  const [isFocusLeft, setIsFocusLeft] = useState(false);
  const [isFocusRight, setIsFocusRight] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [inputLeft, setInputLeft] = useState("");
  const [inputRight, setInputRight] = useState("");
  const [side, setSide] = useState("");
  const dropdownId = useId();
  const detialsBtnRef = useRef();

  const [list, setList] = useState(() => {
    return places.map((place, i) => ({
      ...place,
      selected: false,
      key: i,
      details: false,
    }));
  });

  const inputEvent = (e) => {
    const value = e.target.value.toLowerCase();
    const len = value.length;

    setList((curr) => {
      const temp = [];
      curr.forEach((data) => {
        if (value == data.airport.substring(0, len).toLowerCase()) {
          temp.unshift(data);
        } else {
          temp.push(data);
        }
      });
      return temp;
    });
    switch (side) {
      case "left":
        setInputLeft(() => {
          return e.target.value;
        });
        break;
      case "right":
        setInputRight(() => {
          return e.target.value;
        });
        break;
    }
  };

  useEffect(() => {
    if (!isFocusLeft && !isFocusRight) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isFocusLeft, isFocusRight]);

  useEffect(() => {
    let value = "";
    if (isFocusLeft) {
      value = inputLeft;
    } else if (isFocusRight) {
      value = inputRight;
    }
    if (!value) {
      setList((curr) => {
        return curr.sort((a, b) => (a.airport > b.airport ? 1 : -1));
      });
    }
    value = value.split(" (")[0].toLowerCase();
    const len = value.length;
    if (isOpen) {
      setList((curr) => {
        const temp = [];
        curr.forEach((data) => {
          if (value && value == data.airport.substring(0, len).toLowerCase()) {
            temp.unshift(data);
          } else {
            temp.push(data);
          }
        });
        return temp;
      });
    } else {
      setList((list) => {
        return list.map((curr) => {
          return { ...curr, details: false };
        });
      });
    }
  }, [isOpen, isFocusLeft, isFocusRight]);

  const setListEvent = (key, airport, code) => {
    const value = `${airport} (${code})`;
    switch (side) {
      case "left":
        setInputLeft(value);
        break;
      case "right":
        setInputRight(value);
        break;
    }
  };

  useEffect(() => {
    setList((curr) => {
      return curr.map((data) => {
        if (
          data.airport.toLowerCase() ===
            inputLeft.toLowerCase().split(" (")[0] ||
          data.airport.toLowerCase() === inputRight.toLowerCase().split(" (")[0]
        ) {
          return { ...data, selected: true };
        }
        return { ...data, selected: false, details: false };
      });
    });
    setParentValue([inputLeft, inputRight]);
  }, [inputLeft, inputRight]);

  return (
    <div
      className={
        "w-full h-20 rounded-lg flex gap-1 justify-between relative border-2 p-1 border-blue"
      }
      style={{
        zIndex: z,
      }}
    >
      <DropDown
        dropdownId={dropdownId}
        id="left"
        value={inputLeft}
        setValue={inputEvent}
        isFocus={isFocusLeft}
        setIsFocus={setIsFocusLeft}
        className="border-r-2 border-r-blue pr-7"
        setSide={setSide}
        isOpen={isOpen}
      />
      <DropDown
        dropdownId={dropdownId}
        id="right"
        value={inputRight}
        setValue={inputEvent}
        isFocus={isFocusRight}
        setIsFocus={setIsFocusRight}
        placeholder="To"
        className="border-l-2 border-l-blue pl-7"
        setSide={setSide}
        isOpen={isOpen}
      />
      <SwitchButton
        onClick={() => {
          if (inputLeft && inputRight) {
            let temp = inputLeft;
            setInputLeft(inputRight);
            setInputRight(temp);
          }
        }}
      />
      <ul
        id={dropdownId}
        data-open={isOpen}
        className="w-[95%] max-h-[calc(45px*5+0.8rem)] overflow-y-scroll hidden data-[open=true]:block py-1 bg-white shadow-md rounded-md border border-slate-200 absolute left-1/2 -translate-x-1/2 top-[90%]"
      >
        {list.map((data, i) => (
          <li
            data-select={data.selected}
            title={`${data.country} / ${data.location}`}
            onClick={(e) => {
              if (e.target.id === `detailsbtn-${data.key}`) {
                setList((value) => {
                  return value.map((curr) => {
                    if (curr.key === data.key) {
                      return { ...curr, details: !data.details };
                    }
                    return { ...curr, details: false };
                  });
                });
              } else {
                if (!data.selected) {
                  setListEvent(data.key, data.airport, data.code);
                }
              }
            }}
            className="cursor-pointer data-[select=true]:cursor-not-allowed hover:bg-slate-100"
            key={data.key}
          >
            <div className="flex flex-col w-full items-center">
              <div
                data-select={data.selected}
                data-details={data.details}
                className="w-full h-fit flex gap-x-2 items-center py-3 px-4 justify-between data-[select=true]:bg-slate-200 z-[2] relative data-[select=true]:text-zinc-500 data-[details=true]:shadow-md data-[details=true]:bg-slate-200"
              >
                <div className="flex items-center gap-x-3 w-[calc(100%-4.25rem)]">
                  {data.flag ? (
                    <img src={data.flag} />
                  ) : (
                    <img className="w-7" src="/flags/philippines.png" />
                  )}
                  {data.airport}
                </div>
                <button
                  className="group relative"
                  id={`detailsbtn-${data.key}`}
                >
                  {!data.details ? (
                    <IoMdInformationCircle className="w-7 h-7 opacity-[90%] group-hover:opacity-100 text-main group-active:text-main-active pointer-events-none group-hover:text-main-hover" />
                  ) : (
                    <IoMdClose className="w-7 h-7 opacity-[90%] group-hover:opacity-100 text-main group-active:text-main-active pointer-events-none group-hover:text-main-hover" />
                  )}
                </button>
                <span className="bg-main text-white w-10 text-center py-[0.2rem] rounded-md">
                  {data.code}
                </span>
              </div>
              <div
                data-details={data.details}
                className="w-full bg-slate-100 relative z-[1] h-fit text-[#333] px-7 py-0 rounded-b-lg grid data-[details=false]:grid-rows-[0fr] overflow-hidden data-[details=true]:grid-rows-[1fr] data-[details=true]:py-3 duration-500"
              >
                <div className="flex flex-col min-h-0">
                  <span className="font-extralight text-sm">
                    Country:{" "}
                    <i className="font-extrabold text-base">{data.country}</i>
                  </span>
                  <span className="font-extralight text-sm">
                    Location:{" "}
                    <i className="font-extrabold text-base">{data.location}</i>
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DestinationSelection;
