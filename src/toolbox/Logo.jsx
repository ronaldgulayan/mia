import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

function Logo() {
  return (
    <Tooltip className="text-2xl" color="#f00" title="Back to homepage">
      <Link
        to="/"
        className="h-full select-none flex items-center gap-x-1 py-2"
      >
        <img
          className="h-full"
          draggable={false}
          src="/logos/logo-colored.png"
        />
        <h1 className="font-poppins text-white font-bold text-3xl">
          <span className="text-4xl">M</span>IA
        </h1>
      </Link>
    </Tooltip>
  );
}

export default Logo;
