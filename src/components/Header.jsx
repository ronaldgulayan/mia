import React, { useContext, useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import Logo from "../toolbox/Logo";
import { Link } from "react-router-dom";
import { SigninPopupContext } from "../context/CustomContext";
import CustomLink from "../toolbox/CustomLink";
import useCookies from "../hooks/useCookies";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";

function Header() {
  const signinPopupContext = useContext(SigninPopupContext);
  const [isColored, setIsColored] = useState(false);
  const { getCookie } = useCookies("token");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsColored(false);
        } else if (!entry.isIntersecting) {
          setIsColored(true);
        }
      });
    },
    {
      threshold: 0.4,
      root: null,
    }
  );

  useEffect(() => {
    const elements = document.querySelectorAll(".observer");
    elements.forEach((element) => {
      if (element) observer.observe(element);
    });
  }, []);

  return (
    <div
      data-color={isColored}
      id="header"
      className="w-full h-20 fixed z-[5] data-[color=true]:shadow-md data-[color=true]:bg-main data-[color=false]:bg-gradient-to-b from-[#0009] to-[#0000] px-pad flex items-center justify-between"
    >
      <Logo title="Manila International Airport" />
      <div className="flex items-center gap-x-10 h-full">
        <ul className="flex items-center gap-x-5 h-full text-white text-lg font-poppins">
          {/* <CustomLink
            onClick={() => signinPopupContext.setValue(false)}
            url="/contact"
            className="text-white hover:text-white"
          >
            CONTACT US
          </CustomLink> */}
          <CustomLink url="/about" className="text-white hover:text-white">
            ABOUT US
          </CustomLink>
          {getCookie() ? (
            <Tooltip title="Account" arrow>
              <Link to="/account" draggable={false}>
                <span>
                  <IoPersonCircleSharp className="w-10 h-10 text-white cursor-pointer" />
                </span>
              </Link>
            </Tooltip>
          ) : (
            <CustomLink
              className="text-white hover:text-white"
              onClick={() => signinPopupContext.setValue(true)}
            >
              SIGN IN
            </CustomLink>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
