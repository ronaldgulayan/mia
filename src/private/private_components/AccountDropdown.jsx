import React, { useContext, useEffect, useRef, useState } from "react";
import { IoPersonCircle, IoArrowBack } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  AccountInformationContext,
  AccountPopupContext,
} from "../../context/CustomContext";
import { useNavigate } from "react-router-dom";
import useCookies from "../../hooks/useCookies";
import { PrivateProfileContext } from "../private_context/PrivateContext";

function AccountDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const btnRef = useRef();
  const accountPopupContext = useContext(AccountPopupContext);
  const profileVisibilityContext = useContext(PrivateProfileContext);
  const { removeCookie } = useCookies("token");
  const privateContext = useContext(AccountInformationContext);

  const okEventHandler = (type) => {
    if (type === "ok") {
      removeCookie();
      privateContext.setValue(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        dropdownRef.current &&
        btnRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  const fullName =
    privateContext.value.first_name + " " + privateContext.value.last_name;

  return (
    <div
      ref={btnRef}
      data-open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      className="flex h-fit w-fit items-center active:bg-main-active hover:bg-main-hover cursor-pointer gap-x-1 p-2 select-none rounded-md text-white data-[open=true]:bg-main-hover data-[open=true]:active:bg-main-active relative"
    >
      <div className="flex items-center md:gap-x-2 gap-x-1">
        <IoPersonCircle className="h-8 w-8" />
        <span className="md:block hidden">{fullName}</span>
      </div>
      <HiChevronDown
        data-open={isOpen}
        className="h-8 w-8 data-[open=true]:rotate-180 md:block hidden duration-200"
      />
      <ul
        ref={dropdownRef}
        data-open={isOpen}
        className="absolute top-[85%] pointer-events-none opacity-0 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto data-[open=true]:top-full duration-200 md:w-full w-fit md:pr-0 pr-10 right-0 h-fit bg-white gap-y-1 text-[#222] text-lg flex py-2 rounded-md shadow-md flex-col"
      >
        <li
          onClick={() => profileVisibilityContext.setValue(true)}
          className="w-full h-12 hover:bg-light text-base flex px-3 gap-x-2 items-center"
        >
          <IoMdPerson className="w-6 h-6" />
          Profile
        </li>
        <li
          onClick={() => {
            accountPopupContext.setValue((curr) => ({
              ...curr,
              state: true,
              title: "Logout confirmation",
              message: "Are you sure you want to logout?",
              submitEventHandler: okEventHandler,
            }));
          }}
          className="w-full h-12 hover:bg-light text-base flex px-3 gap-x-2 items-center"
        >
          <MdLogout className="w-6 h-6" />
          Logout
        </li>
      </ul>
    </div>
  );
}

export default AccountDropdown;
