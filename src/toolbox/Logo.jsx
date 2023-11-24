import React from "react";

function Logo() {
  return (
    <div className="h-full select-none flex items-center gap-x-1">
      <img className="h-full" draggable={false} src="/logos/logo-light.png" />
      <h1 className="font-poppins text-white font-bold text-3xl">
        <span className="text-4xl">M</span>IA
      </h1>
    </div>
  );
}

export default Logo;
