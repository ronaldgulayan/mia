import React from "react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import CustomLink from "../toolbox/CustomLink";
import Tooltip from "@mui/material/Tooltip";
import { Navigate } from "react-router-dom";

function Footer() {
  const icons = [
    {
      label: "Facebook",
      Icon: FaFacebook,
      url: "https://www.facebook.com/ronald.gulayan/",
    },
    {
      label: "Portfolio",
      Icon: IoPerson,
      url: "https://ronaldgulayan.github.io/portfolio/",
    },
    {
      label: "Github",
      Icon: FaGithub,
      url: "https://github.com/ronaldgulayan",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full h-fit bg-main relative flex flex-col px-pad pt-pad pb-[2rem]">
        <div className="grid grid-cols-2">
          <img
            className="absolute w-20 h-20 left-1/2 top-10 -translate-x-1/2"
            src="/logos/main-logo.png"
          />
          <div className="pr-32">
            <div className="w-full h-20 border-t-2 border-t-black"></div>
          </div>
          <div className="pl-32">
            <div className="w-full h-20 border-t-2 border-t-black"></div>
          </div>
        </div>
        <div className="w-full grid grid-cols-3">
          <div className="flex flex-col items-center gap-y-1">
            <CustomLink className="text-white hover:text-white">
              PRIVACY POLICY
            </CustomLink>
            <CustomLink className="text-white hover:text-white">
              TERMS & CONDITION
            </CustomLink>
            <CustomLink url="/about" className="text-white hover:text-white">
              ABOUT
            </CustomLink>
          </div>
          <div className="flex justify-evenly gap-x-14 h-28 relative">
            {icons.map((icon, i) => {
              return (
                <Tooltip key={i} title={icon.label} arrow>
                  <a className="h-fit" href={icon.url} target="_blank">
                    {icon.Icon && <icon.Icon className="w-7 h-7 text-white" />}
                  </a>
                </Tooltip>
              );
            })}
            <div className="w-[2px] h-1/2 bottom-0 bg-black absolute left-1/2 -translate-x-1/2" />
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <CustomLink className="text-white hover:text-white">
              airlinemia@gmail.com
            </CustomLink>
            <CustomLink className="text-white hover:text-white">
              +639384535499
            </CustomLink>
            <CustomLink className="text-white hover:text-white">
              123 Main Street Naic, Cavite
            </CustomLink>
          </div>
        </div>
      </div>
      <div className="bg-[#111] text-white w-full h-20 flex items-center justify-center">
        Copyright&#169; 2023. Manila International Airport. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
