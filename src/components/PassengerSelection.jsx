import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaPlus, FaMinus, FaInfo } from "react-icons/fa";

const Icons = ({ Icon, onClick }) => {
  return (
    <Icon
      onClick={onClick}
      className="w-8 h-8 bg-main opacity-90 active:opacity-100 hover:bg-main-hover cursor-pointer rounded-full text-white p-2"
    />
  );
};

const Item = ({ label, value, setValue, description, max = 10 }) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  return (
    <div className="w-full cursor-default h-full flex flex-col items-center">
      <div
        data-info={isOpenInfo}
        className="data-[info=true]:bg-slate-200 relative z-[2] data-[info=true]:shadow-md flex justify-between w-full hover:bg-slate-200 py-3 px-4"
      >
        <div className="flex items-center gap-x-2">
          <span>{label}</span>
          {description && (
            <FaInfo
              onClick={() => {
                setIsOpenInfo((curr) => {
                  if (description) return !curr;
                });
              }}
              className="w-5 h-5 cursor-pointer bg-main rounded-full p-1 text-white"
            />
          )}
        </div>
        <div className="flex items-center">
          <Icons
            onClick={() =>
              setValue((curr) => {
                if (curr > 0) {
                  return curr - 1;
                }
                return 0;
              })
            }
            Icon={FaMinus}
          />
          <span className="w-12 text-center">{value}</span>
          <Icons
            onClick={() =>
              setValue((curr) => {
                if (curr < max) return curr + 1;
                return max;
              })
            }
            Icon={FaPlus}
          />
        </div>
      </div>
      {description && (
        <div
          data-open={isOpenInfo}
          className="px-3 duration-500 relative z-[1] data-[open=true]:py-2 data-[open=true]:grid-rows-[1fr] data-[open=true]:border grid py-0 grid-rows-[0fr] border-0 overflow-hidden border-slate-200 text-slate-600 text-xs bg-slate-100 w-[90%]"
        >
          <div className="min-h-0 flex w-full gap-x-2">
            <span className="w-[calc(100%-0.75rem)]">{description}</span>
            <span className="w-3 flex items-end h-full">
              <FaChevronDown
                onClick={() => setIsOpenInfo(false)}
                className="w-3 h-3 opacity-80 hover:opacity-100 rotate-180 cursor-pointer"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

function PassengerSelection({ setParentValue = function (value) {} }) {
  const [isFocus, setIsFocus] = useState(false);
  const dropdownRef = useRef();
  const dropdownPassengerRef = useRef();
  const [childrenValue, setChildrenValue] = useState(0);
  const [adultValue, setAdultValue] = useState(0);
  const [seniorValue, setSeniorValue] = useState(0);
  const [pwdValue, setPwdValue] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        dropdownRef.current &&
        dropdownPassengerRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !dropdownPassengerRef.current.contains(e.target)
      ) {
        setIsFocus(false);
      }
    };

    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  useEffect(() => {
    const total = childrenValue + adultValue + seniorValue + pwdValue;
    setValue(total === 0 ? "" : `${total} Passenger${total > 1 ? "s" : ""}`);
    setParentValue({
      child: childrenValue,
      adult: adultValue,
      senior: seniorValue,
      pwd: pwdValue,
    });
  }, [childrenValue, adultValue, seniorValue, pwdValue]);

  return (
    <div
      onClick={(e) => {
        if (
          dropdownPassengerRef.current &&
          dropdownPassengerRef.current.contains(e.target)
        ) {
          setIsFocus(!isFocus);
        }
      }}
      className="w-full h-20 z-[19] md:z-auto select-none rounded-lg flex gap-1 justify-between relative border-2 px-5 border-blue items-center cursor-pointer"
    >
      <div
        ref={dropdownPassengerRef}
        className="w-full h-full flex items-center justify-between"
      >
        <div className="w-full rounded-md flex items-center data-[focus=true]:outline data-[focus=true]:outline-[3px] data-[focus=true]:outline-blue h-full py-1 relative">
          <span
            data-focus={isFocus}
            data-empty={!!value}
            className="data-[focus=true]:top-7 data-[empty=true]:top-7 pointer-events-none select-none data-[focus=true]:text-xs data-[empty=true]:text-xs absolute top-1/2 -translate-y-1/2 text-xl duration-100 z-[2]"
          >
            Passenger
          </span>
          <span className="translate-y-3 text-lg">{value}</span>
        </div>
        <span>
          <FaChevronDown
            data-open={isFocus}
            className="w-5 h-5 data-[open=true]:rotate-180 text-blue"
          />
        </span>
      </div>
      <div
        ref={dropdownRef}
        data-open={isFocus}
        className="w-[95%] hidden shadow-md rounded-md h-fit bg-white border border-slate-200 absolute data-[open=true]:flex flex-col py-2 top-[90%] left-1/2 -translate-x-1/2"
      >
        <Item
          label="Children"
          value={childrenValue}
          setValue={setChildrenValue}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          max={5}
        />
        <Item label="Adult" value={adultValue} setValue={setAdultValue} />
        <Item
          label="Senior Citizen"
          value={seniorValue}
          setValue={setSeniorValue}
        />
        <Item
          label="Person with Disability"
          value={pwdValue}
          setValue={setPwdValue}
        />
      </div>
    </div>
  );
}

export default PassengerSelection;
