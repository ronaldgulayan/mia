import React, { useState } from "react";

function ServicesPage() {
  const [dots, setDots] = useState([
    {
      key: crypto.randomUUID(),
      label: "label 1",
      element: null,
      selected: true,
    },
    {
      key: crypto.randomUUID(),
      label: "label 2",
      element: null,
      selected: false,
    },
    {
      key: crypto.randomUUID(),
      label: "label 3",
      element: null,
      selected: false,
    },
    {
      key: crypto.randomUUID(),
      label: "label 4",
      element: null,
      selected: false,
    },
  ]);

  return (
    <div className="w-full h-[90dvh] flex bg-white">
      <div className="w-32 h-full bg-green-500 flex items-center justify-center">
        <div className="flex flex-col h-fit items-center gap-y-10 relative">
          {dots.map((dot) => (
            <div
              onClick={() => {
                setDots((curr) => {
                  return curr.map((raw) => {
                    if (raw.key === dot.key) return { ...raw, selected: true };
                    return { ...raw, selected: false };
                  });
                });
              }}
              data-selected={dot.selected}
              className="w-5 h-5 group rounded-full border-[0.25rem] cursor-pointer duration-300 bg-white border-black data-[selected=true]:scale-125 data-[selected=true]:shadow-md z-[2] data-[selected=true]:bg-black flex items-center"
            >
              <div className="absolute group-hover:block font-bold hidden bg-white rounded-sm shadow-md w-fit left-[calc(100%+1.5rem)] items-center">
                <p className="w-full select-none relative whitespace-nowrap bg-white h-full px-3 py-1 text-sm z-[2]">
                  {dot.label}
                </p>
                <div className="absolute z-[1] bg-white top-1/2 -left-1 -translate-y-1/2 rotate-45 w-4 h-4" />
              </div>
            </div>
          ))}
          <span className="absolute w-1 h-full z-[1] bg-black" />
        </div>
      </div>
      <div className="w-[calc(100%-8rem)] h-full flex items-center justify-center">
        <img className="h-96 rounded-2xl shadow-md" src="/images/img1.png" />
        <div className="w-96 h-96 flex flex-col justify-center px-5">hello</div>
      </div>
    </div>
  );
}

export default ServicesPage;
