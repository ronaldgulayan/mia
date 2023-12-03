import React, { useContext, useState } from "react";
import AccountHeader from "./private_components/AccountHeader";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { HiMiniChevronRight } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AccountDrawerContext } from "../context/CustomContext";
import Dashboard from "./private_pages/Dashboard";
import Profile from "./private_pages/Profile";
import Settings from "./private_pages/Settings";
import History from "./private_pages/History";
import { MdHistory } from "react-icons/md";

function Account() {
  const [drawerButtons, setDrawerButtons] = useState([
    {
      key: 1,
      label: "Dashboard",
      Icon: MdSpaceDashboard,
      selected: true,
      element: <Dashboard />,
    },
    {
      key: 2,
      label: "History",
      Icon: MdHistory,
      selected: false,
      element: <History />,
    },
    {
      key: 3,
      label: "Settings",
      Icon: IoMdSettings,
      selected: false,
      element: <Settings />,
    },
  ]);
  const [element, setElement] = useState(<Dashboard />);

  return (
    <AccountDrawerContext.Provider
      value={{
        setDrawerButtons: setDrawerButtons,
        setElement: setElement,
      }}
    >
      <div className="w-full h-screen bg-light">
        <AccountHeader />
        <div className="w-full h-[calc(100%-5rem)] flex">
          <div className="w-72 h-full bg-white shadow-md p-3">
            {drawerButtons.map((data) => (
              <div
                onClick={() => {
                  setDrawerButtons((curr) => {
                    return curr.map((btn) => {
                      if (btn.key === data.key) {
                        return { ...btn, selected: true };
                      }
                      return { ...btn, selected: false };
                    });
                  });
                  setElement(data.element);
                }}
                data-selected={data.selected}
                key={data.key}
                className="w-full select-none data-[selected=true]:bg-main data-[selected=true]:text-white group h-14 rounded-md duration-100 flex items-center justify-between px-3 hover:bg-slate-100 text-base cursor-pointer text-[#222]"
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
            <Link
              className="w-full group h-14 rounded-md duration-100 flex items-center justify-between px-3 select-none hover:bg-slate-100 text-base cursor-pointer text-[#222] hover:text-[#222]"
              to="/"
            >
              <div className="flex items-center gap-x-2">
                <IoArrowBack className="w-6 h-6" />
                Back
              </div>
            </Link>
          </div>
          <div className="w-[calc(100%-18rem)] h-full flex flex-col gap-y-5 p-[2rem] overflow-y-scroll">
            {element}
          </div>
        </div>
      </div>
    </AccountDrawerContext.Provider>
  );
}

export default Account;