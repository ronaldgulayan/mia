import React from "react";
import AccountDropdown from "./AccountDropdown";

function AccountHeader() {
  return (
    <div className="w-full h-20 bg-main px-pad flex justify-between items-center">
      <div className="flex items-center gap-x-4">
        <img className="h-[3.2rem]" src="/logos/main-logo.png" />
        <span className="text-white font-montserrat-bold text-2xl flex items-center gap-x-3">
          User Account
        </span>
      </div>
      <AccountDropdown />
    </div>
  );
}

export default AccountHeader;
