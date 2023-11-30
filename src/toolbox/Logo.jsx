import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

function Logo() {
  return (
    <Tooltip className="text-2xl" color="#f00" title="Back to homepage">
      <Link
        to="/"
        className="h-full select-none flex items-center gap-x-3 py-2"
      >
        <img
          className="h-[3rem]"
          draggable={false}
          src="/logos/main-logo.png"
        />
        <h1 className="text-white font-montserrat-bold text-2xl">
          Manila International Airport
        </h1>
      </Link>
    </Tooltip>
  );
}

export default Logo;
