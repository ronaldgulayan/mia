import React, { useContext } from "react";
import { Input } from "semantic-ui-react";
import Logo from "../toolbox/Logo";
import { Link } from "react-router-dom";
import { SigninPopupContext } from "../context/CustomContext";
import CustomLink from "../toolbox/CustomLink";

function Header() {
  const signinPopupContext = useContext(SigninPopupContext);
  return (
    <div className="w-full h-20 relative z-[3] shadow-md bg-main px-pad flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-x-10 h-full">
        <ul className="flex items-center gap-x-5 h-full text-white text-lg font-poppins">
          <button className="hover:text-inherit h-full group hover:underline relative underline-offset-4">
            About Us
          </button>
          <button
            onClick={() => console.log(signinPopupContext.value)}
            className="hover:text-inherit h-full group hover:underline relative underline-offset-4"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[85%] group-hover:top-[90%] w-96 h-fit bg-white shadow-md opacity-0 pointer-events-none p-8 group-hover:opacity-100 text-black flex flex-col items-start group-hover:pointer-events-auto cursor-auto duration-150 rounded-md gap-y-3">
              <p className="font-montserrat-bold text-lg text-main">
                Help & Support
              </p>
              <div className="flex flex-col gap-y-1">
                <CustomLink
                  onClick={() => signinPopupContext.setValue(false)}
                  url="/contact"
                  className="text-based font-montserrat-italic"
                >
                  Contact Us
                </CustomLink>
                <CustomLink className="text-based font-montserrat-italic">
                  Help Page FAQ
                </CustomLink>
                <CustomLink className="text-based font-montserrat-italic">
                  PAL Help Page
                </CustomLink>
                <CustomLink className="text-based font-montserrat-italic">
                  FAQ
                </CustomLink>
              </div>
            </div>
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
