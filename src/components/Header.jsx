import React from "react";
import { Input } from "semantic-ui-react";
import Logo from "../toolbox/Logo";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-20 relative z-[2] shadow-md bg-blue px-pad flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-x-10">
        <ul className="flex items-center gap-x-5 text-white text-lg font-poppins">
          <Link className="hover:text-inherit hover:underline underline-offset-4">
            HELP & SUPPORT
          </Link>
          <Link
            className="hover:text-inherit hover:underline underline-offset-4"
            to="/registration"
          >
            SIGN IN
          </Link>
        </ul>
        <Input action={{ icon: "search" }} placeholder="Search..." />
      </div>
    </div>
  );
}

export default Header;
