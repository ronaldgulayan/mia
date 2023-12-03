import React from "react";
import AccountDropdown from "./AccountDropdown";
import Logo from "../../toolbox/Logo";

function AccountHeader() {
  return (
    <div className="w-full h-20 bg-main px-pad shadow-md relative z-[2] flex justify-between items-center">
      <Logo title="User Account" />
      <AccountDropdown />
    </div>
  );
}

export default AccountHeader;
