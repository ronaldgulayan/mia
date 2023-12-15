import React from "react";

function Content({ title = "Title", children }) {
  return (
    <div className="w-full min-h-screen md:py-pad py-[3rem] md:px-[10rem] px-[2.5rem] gap-y-5 flex flex-col">
      <p className="font-montserrat-black uppercase md:pb-[3rem] pb-[1rem] md:text-5xl text-4xl text-blue-800">
        {title}
      </p>
      {children}
    </div>
  );
}

export default Content;
