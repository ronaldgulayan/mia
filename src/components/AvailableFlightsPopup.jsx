import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "semantic-ui-react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { BookingContext } from "../context/CustomContext";
import { Tooltip } from "@mui/material";

const Flag = ({ path = "/flags/philippines.png" }) => {
  return <img className="w-4 h-4 select-none" draggable="false" src={path} />;
};

const Item = ({ from = "", to = "", flight = 1 }) => {
  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full flex flex-col gap-y-1 relative z-[2]">
        <p className="text-md font-bold text-slate-500">Flight {flight}</p>
        <div className="w-full h-20 bg-slate-200 border border-slate-400 rounded-lg flex items-center justify-between px-5">
          <div className="flex items-center gap-x-3">
            <Tooltip title="From" arrow>
              <div className="text-xl flex items-center gap-x-1">
                <Flag />
                {from}
              </div>
            </Tooltip>
            <FaLongArrowAltRight className="text-main" />
            <Tooltip title="To" arrow>
              <div className="text-xl flex items-center gap-x-1">
                {to}
                <Flag />
              </div>
            </Tooltip>
          </div>
          <div className="flex items-center gap-x-5">
            <Tooltip title="Price" arrow>
              <p className="text-lg font-montserrat-bold">₱3000</p>
            </Tooltip>
            <Tooltip title="Details" arrow>
              <button>
                <IoInformationCircleSharp className="w-7 h-7 text-main hover:text-main-hover active:text-main-active cursor-pointer" />
              </button>
            </Tooltip>
            <Button color="green">Book</Button>
          </div>
        </div>
      </div>
      <div className="h-20 bg-red-500 w-[97%] relative z-[1] -translate-y-1 p-3 rounded-b-md">
        hello
      </div>
    </div>
  );
};

function AvailableFlightsPopup() {
  const visibilityContext = useContext(BookingContext);

  return (
    <div
      data-state={visibilityContext.value}
      className="w-full data-[state=true]:opacity-100 data-[state=true]:pointer-events-auto h-screen fixed top-0 opacity-0 pointer-events-none left-0 backdrop-blur-sm bg-[#0009] z-[6] flex items-center duration-200 justify-center"
    >
      <div
        data-state={visibilityContext.value}
        className="w-[90%] md:w-[45rem] data-[state=true]:translate-y-0 data-[state=true]:opacity-100 duration-200 -translate-y-5 opacity-0 h-fit bg-white rounded-lg shadow-md overflow-hidden"
      >
        <header className="flex items-center justify-between px-5 w-full h-16 border-b border-b-slate-300 shadow-md">
          <p className="text-lg font-montserrat-bold">Available Flights</p>
          <button
            onClick={() => visibilityContext.setValue(false)}
            className="text-xl font-bold opacity-50 hover:opacity-100 duration-100"
          >
            &#10005;
          </button>
        </header>
        <div className="p-5 flex flex-col w-full gap-y-3 max-h-[60dvh] overflow-y-scroll">
          <Item from="Manila" to="Cavite" />
        </div>
      </div>
    </div>
  );
}

export default AvailableFlightsPopup;
