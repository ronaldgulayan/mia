import React, { useState } from "react";

const Content1 = () => {
  return (
    <>
      <img className="h-96 rounded-2xl shadow-md" src="/images/img1.png" />
      <div className="w-fit h-96 flex flex-col max-w-[30rem] justify-center px-5 gap-y-5">
        <div className="flex flex-col gap-y-1">
          <p className="font-bold text-4xl text-[#222]">MY PAL UPGRADE</p>
          <p className="text-slate-600">
            Upgrade your flight and enjoy the best of PAL. Upgrade your flight
            and enjoy the best of PAL.
          </p>
        </div>
        <button className="w-fit px-3 py-2 bg-main hover:bg-main-hover active:bg-main-active text-white rounded-sm">
          UPGRADE NOW
        </button>
      </div>
    </>
  );
};

const Content2 = () => {
  return (
    <>
      <div className="w-fit h-96 max-w-[30rem] flex flex-col justify-center px-5 gap-y-5">
        <div className="flex flex-col gap-y-1">
          <p className="font-bold text-4xl text-[#222]">PAL HOLIDAYS</p>
          <p className="text-slate-600">
            Flights, hotels, experiences, and transport in one easy booking!
            Flights, hotels, experiences, and transport in one easy booking!
          </p>
        </div>
        <button className="w-fit px-3 py-2 bg-main hover:bg-main-hover active:bg-main-active text-white rounded-sm">
          LEARN MORE
        </button>
      </div>
      <img className="h-96 rounded-2xl shadow-md" src="/images/img2.png" />
    </>
  );
};

const Content3 = () => {
  return (
    <>
      <img className="h-96 rounded-2xl shadow-md" src="/images/img3.png" />
      <div className="w-fit h-96 max-w-[30rem] flex flex-col justify-center px-5 gap-y-5">
        <div className="flex flex-col gap-y-1">
          <p className="font-bold text-4xl text-[#222]">DEAR PAL E-CARDS</p>
          <p className="text-slate-600 ">
            Gift flights from the heart with our Dear PAL e-Cards! Use your
            credit card or convert your Mabuhay Miles to purchase.
          </p>
        </div>
        <button className="w-fit px-3 py-2 bg-main hover:bg-main-hover active:bg-main-active text-white rounded-sm">
          BUY NOW
        </button>
      </div>
    </>
  );
};

const Content4 = () => {
  return (
    <>
      <div className="w-fit h-96 max-w-[30rem] flex flex-col justify-center px-5 gap-y-5">
        <div className="flex flex-col gap-y-1">
          <p className="font-bold text-4xl text-[#222]">CORPORATE TRIPS</p>
          <p className="text-slate-600">
            Got work offsite? We'll take you there. Got work offsite? We'll take
            you there. Got work offsite? We'll take you there.
          </p>
        </div>
        <button className="w-fit px-3 py-2 bg-main hover:bg-main-hover active:bg-main-active text-white rounded-sm">
          LEARN MORE
        </button>
      </div>
      <img className="h-96 rounded-2xl shadow-md" src="/images/img4.png" />
    </>
  );
};

function ServicesPage() {
  const [dots, setDots] = useState([
    {
      key: crypto.randomUUID(),
      label: "MY PAL UPGRADE",
      element: <Content1 />,
      selected: true,
    },
    {
      key: crypto.randomUUID(),
      label: "PAL HOLIDAYS",
      element: <Content2 />,
      selected: false,
    },
    {
      key: crypto.randomUUID(),
      label: "DEAR PAL E-CARDS",
      element: <Content3 />,
      selected: false,
    },
    {
      key: crypto.randomUUID(),
      label: "CORPORATE TRIPS",
      element: <Content4 />,
      selected: false,
    },
  ]);
  const [content, setContent] = useState(<Content1 />);

  return (
    <div className="w-full h-[90dvh] flex bg-white px-pad">
      <div className="w-32 h-full flex items-center justify-center">
        <div className="flex flex-col h-fit items-center gap-y-10 relative">
          {dots.map((dot) => (
            <div
              key={dot.key}
              onClick={() => {
                setDots((curr) => {
                  return curr.map((raw) => {
                    if (raw.key === dot.key) return { ...raw, selected: true };
                    return { ...raw, selected: false };
                  });
                });
                setContent(dot.element);
              }}
              data-selected={dot.selected}
              className="w-5 h-5 group rounded-full border-[0.25rem] cursor-pointer duration-300 bg-white border-black data-[selected=true]:shadow-md z-[2] data-[selected=true]:bg-black flex items-center"
            >
              <div className="absolute group-hover:block font-bold hidden rounded-md bg-[#efefef] shadow-md w-fit left-[calc(100%+1.5rem)] items-center">
                <p className="w-full select-none relative whitespace-nowrap rounded-md bg-[#efefef] h-full px-4 py-3 text-sm z-[2]">
                  {dot.label}
                </p>
                <div className="absolute z-[1] bg-[#efefef] top-1/2 -left-1 -translate-y-1/2 rotate-45 w-4 h-4" />
              </div>
            </div>
          ))}
          <span className="absolute w-1 h-full z-[1] bg-black" />
        </div>
      </div>
      <div className="w-[calc(100%-8rem)] h-full flex items-center justify-center gap-x-10">
        {content}
      </div>
    </div>
  );
}

export default ServicesPage;
