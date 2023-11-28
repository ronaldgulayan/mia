import React from "react";

function MiniBanner({ img = "" }) {
  return (
    <div className="w-full h-[70dvh]">
      <img src={img} className="h-full w-full object-cover" />
    </div>
  );
}

export default MiniBanner;
