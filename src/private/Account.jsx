import React, { useContext, useState } from "react";
import AccountHeader from "./AccountHeader";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { HiMiniChevronRight } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";

function Account() {
  const [drawerButtons, setDrawerButtons] = useState([
    {
      key: 1,
      label: "Dashboard",
      Icon: MdSpaceDashboard,
      selected: true,
    },
    {
      key: 2,
      label: "Account",
      Icon: IoMdPerson,
      selected: false,
    },
    {
      key: 3,
      label: "Back",
      Icon: IoArrowBack,
      selected: false,
    },
  ]);

  return (
    <div className="w-full h-screen bg-light">
      <AccountHeader />
      <div className="w-full h-[calc(100%-5rem)]">
        <div className="w-72 h-full bg-white shadow-md p-3">
          {drawerButtons.map((data) => (
            <div
              data-selected={data.selected}
              key={data.key}
              className="w-full data-[selected=true]:bg-main data-[selected=true]:text-white group h-14 rounded-md duration-100 flex items-center justify-between px-3 hover:bg-slate-100 text-base cursor-pointer text-[#222]"
            >
              <div className="flex items-center gap-x-2">
                {data.Icon && <data.Icon className="w-6 h-6" />}
                {data.label}
              </div>
              <HiMiniChevronRight
                data-selected={data.selected}
                className="w-6 h-6 opacity-0 data-[selected=true]:text-white group-hover:opacity-100 text-[#222] duration-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
