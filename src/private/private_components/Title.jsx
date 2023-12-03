import React from "react";

function Title({ label }) {
  return (
    <>
      <h1 className="text-3xl font-montserrat-black">{label}</h1>
      <div className="w-full h-[1px] bg-slate-400" />
    </>
  );
}

export default Title;
