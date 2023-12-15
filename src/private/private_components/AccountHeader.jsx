import React, { useContext } from "react";
import AccountDropdown from "./AccountDropdown";
import Logo from "../../toolbox/Logo";
import { LuMenu } from "react-icons/lu";
import { DrawerVisibilityContext } from "../private_context/PrivateContext";
import { IoClose } from "react-icons/io5";

function AccountHeader() {
  const drawerVisibilityContext = useContext(DrawerVisibilityContext);

  return (
    <div className="w-full h-20 bg-main md:px-pad px-[2rem] shadow-md relative z-[2] flex justify-between items-center">
      <Logo title="User Account" />
      <div className="flex items-center gap-x-2">
        <AccountDropdown />
        {drawerVisibilityContext.value ? (
          <IoClose
            onClick={() => drawerVisibilityContext.setValue(false)}
            className="h-12 w-12 md:hidden block bg-main text-white hover:bg-main-hover active:bg-main-active rounded-md p-2"
          />
        ) : (
          <LuMenu
            onClick={() => drawerVisibilityContext.setValue(true)}
            className="h-12 w-12 md:hidden block bg-main text-white hover:bg-main-hover active:bg-main-active rounded-md p-2"
          />
        )}
      </div>
    </div>
  );
}

export default AccountHeader;
