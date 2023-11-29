import React from "react";

function MiniBanner({ img = "" }) {
  return (
    <div className="observer w-full h-[90dvh]">
      <img src={img} className="h-full w-full object-cover" />
    </div>
  );
}

export default MiniBanner;
