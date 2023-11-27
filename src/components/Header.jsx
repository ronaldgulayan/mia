import React, { useContext } from "react";
import { Input } from "semantic-ui-react";
import Logo from "../toolbox/Logo";
import { Link } from "react-router-dom";
import { SigninPopupContext } from "../context/CustomContext";

function Header() {
  const signinPopupContext = useContext(SigninPopupContext);
  return (
    <div className="w-full h-20 relative z-[2] shadow-md bg-main px-pad flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-x-10">
        <ul className="flex items-center gap-x-5 text-white text-lg font-poppins">
          <button className="hover:text-inherit hover:underline underline-offset-4">
            HELP & SUPPORT
          </button>
          <button
            onClick={() => signinPopupContext.setValue(true)}
            className="hover:text-inherit hover:underline underline-offset-4"
          >
            SIGN IN
          </button>
        </ul>
        <Input action={{ icon: "search" }} placeholder="Search..." />
      </div>
    </div>
  );
}

export default Header;
