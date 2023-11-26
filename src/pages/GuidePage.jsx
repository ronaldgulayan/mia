import React from "react";

const Item = ({ title = "", description = "", img = "", url = "" }) => {
  return (
    <div className="flex group cursor-pointer flex-col w-64 h-full shadow-lg rounded-2xl overflow-hidden">
      <div className="h-[9rem] overflow-hidden flex items-center justify-center">
        <img className="group-hover:scale-110 duration-200" src={img} />
      </div>
      <div className="w-full h-[calc(100%-9rem)] border-l-2 border-r-2 border-r-slate-400 border-b-2 border-b-slate-400 border-slate-400 rounded-b-2xl flex gap-y-1 flex-col px-7 py-6">
        <p className="text-lg group-hover:underline text-blue font-bold underline-offset-4">
          {title}
        </p>
        <p className="text-base text-slate-500">{description}</p>
      </div>
    </div>
  );
};

function GuidePage() {
  return (
    <div className="bg-light w-full h-[100dvh] flex flex-col p-pad gap-y-10">
      <p className="text-lg tracking-widest text-blue">
        <span className="underline underline-offset-8 decoration-orange-700">
          TRAVEL
        </span>{" "}
        GUIDE
      </p>
      <p className="text-5xl font-montserrat-bold">Explore with confidence</p>
      <div className="w-full text-center">
        <button className="w-fit bg-blue text-white px-5 py-3 rounded-full">
          COVID INFORMATION
        </button>
      </div>
      <div className="w-full h-full flex justify-center gap-x-10">
        <Item
          title="Safety and well-being"
          description="Find out what it’s like to travel in the new normal"
          img="/images/img1.png"
        />
        <Item
          title="Travel rules and requirements"
          description="Find out what it’s like to travel in the new normal"
          img="/images/img2.png"
        />
        <Item
          title="Flexible travel options"
          description="Find out what it’s like to travel in the new normal"
          img="/images/img3.png"
        />
        <Item
          title="Covid-19 restoration flights"
          description="Find out what it’s like to travel in the new normal"
          img="/images/img4.png"
        />
      </div>
    </div>
  );
}

export default GuidePage;
