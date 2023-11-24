import React, { useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";

const Select = ({ label, Icon, placeholder, direction = "left" }) => {
  return (
    <div className="border-2 z-[1] border-slate-400 h-full w-full relative rounded-md">
      <div
        data-direction={direction}
        className="px-5 font-poppins data-[direction=left]:justify-start data-[direction=right]:justify-end flex items-center h-full w-full"
      >
        {placeholder ? placeholder : "Placeholder"}
      </div>
    </div>
  );
};

const SwitchButton = () => {
  const [isSwitch, setIsSwitch] = useState(false);

  return (
    <div
      onClick={() => setIsSwitch(!isSwitch)}
      className="absolute z-[2] left-1/2 -translate-x-1/2 cursor-pointer w-16 h-16 rounded-full outline outline-4 outline-blue shadow-md flex items-center bg-white justify-center"
    >
      <HiSwitchHorizontal
        data-switch={isSwitch}
        className="w-10 h-10 duration-150 rotate-0 data-[switch=true]:rotate-180"
      />
    </div>
  );
};

function SelectDestination() {
  return (
    <div className="w-full gap-x-7 h-14 grid grid-cols-2 relative">
      <Select direction="left" />
      <SwitchButton />
      <Select direction="right" />
    </div>
  );
}

export default SelectDestination;
