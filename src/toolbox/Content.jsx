import React from "react";

function Content({ title = "Title", children }) {
  return (
    <div className="w-full min-h-screen py-pad px-[10rem] gap-y-5 flex flex-col">
      <p className="font-montserrat-black uppercase pb-[3rem] text-5xl text-blue-800">
        {title}
      </p>
      {children}
    </div>
  );
}

export default Content;
