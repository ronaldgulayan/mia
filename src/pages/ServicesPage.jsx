import React, { useState } from "react";
import { Placeholder } from "semantic-ui-react";

const Content = ({
  description = "description",
  title = "Sample title",
  btnLabel = "Button",
  img = "",
  flip = false,
}) => {
  if (flip) {
    return (
      <>
        <div className="w-fit h-96 max-w-[30rem] flex flex-col justify-center px-5 gap-y-5">
          <div className="flex flex-col gap-y-1">
            <p className="font-bold text-4xl text-[#222]">{title}</p>
            <p className="text-slate-600">{description}</p>
          </div>
          <button className="w-fit px-3 py-2 bg-main hover:bg-main-hover active:bg-main-active text-white rounded-sm">
            {btnLabel}
          </button>
        </div>
        <div className="w-[27rem] hidden md:block relative h-96 shadow-md rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover relative z-[2]"
            src={img}
          />
          <Placeholder className="absolute z-[1] w-full h-full">
            <Placeholder.Image />
          </Placeholder>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-[27rem] hidden md:block h-96 relative shadow-md rounded-md overflow-hidden">
        <img className="w-full h-full object-cover relative z-[2]" src={img} />
        <Placeholder className="absolute z-[1] w-full h-full">
          <Placeholder.Image />
        </Placeholder>
      </div>
      <div className="w-fit h-96 flex flex-col max-w-[30rem] justify-center px-5 gap-y-5">
        <div className="flex flex-col gap-y-1">
          <p className="font-bold text-4xl text-[#222]">{title}</p>
          <p className="text-slate-600">{description}</p>
        </div>
        <button className="w-fit px-3 py-2 bg-main hover:bg-main-hover active:bg-main-active text-white rounded-sm">
          {btnLabel}
        </button>
      </div>
    </>
  );
};

function ServicesPage() {
  const [dots, setDots] = useState([
    {
      key: crypto.randomUUID(),
      title: "Check-In Services",
      description:
        "Traditional check-in counters and self-service kiosks for a seamless start to the journey. Efficient processing to obtain boarding passes and check baggage.",
      selected: true,
      btnLabel: "Learn More",
      img: "/images/service-service.jpg",
      flip: false,
    },
    {
      key: crypto.randomUUID(),
      title: "Security Services",
      description:
        "Rigorous security screening to ensure passenger safety. Well-trained personnel and advanced technology for effective security measures.",
      selected: false,
      btnLabel: "Learn More",
      img: "/images/service-security.jpg",
      flip: true,
    },
    {
      key: crypto.randomUUID(),
      title: "Baggage Services",
      description:
        "Convenient baggage drop-off points. Clearly marked baggage claim areas for the retrieval of checked luggage.",
      selected: false,
      btnLabel: "Learn More",
      img: "/images/service-baggage.jpg",
      flip: false,
    },
    {
      key: crypto.randomUUID(),
      title: "Ground Transportation",
      description:
        "Easily accessible ground transportation options, including taxis, ride-sharing, and car rental services. Shuttle services connecting the airport to key destinations in the city or region.",
      selected: false,
      btnLabel: "Learn More",
      img: "/images/service-transform.jpg",
      flip: true,
    },
  ]);
  const [content, setContent] = useState(<Content {...dots[0]} />);

  return (
    <div className="w-full h-[90dvh] md:gap-x-0 gap-x-5 flex bg-white px-2 md:px-pad">
      <div className="w-16 md:w-32 h-full flex items-center justify-center">
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
                setContent(() => <Content key={dot.key} {...dot} />);
              }}
              data-selected={dot.selected}
              className="w-5 h-5 group rounded-full border-[0.25rem] cursor-pointer duration-300 bg-white border-black data-[selected=true]:shadow-md z-[2] data-[selected=true]:bg-black flex items-center"
            >
              <div className="absolute group-hover:block font-bold hidden rounded-md bg-[#efefef] shadow-md w-fit left-[calc(100%+1.5rem)] items-center">
                <p className="w-full select-none relative whitespace-nowrap rounded-md bg-[#efefef] h-full px-4 py-3 text-sm z-[2]">
                  {dot.title}
                </p>
                <div className="absolute z-[1] bg-[#efefef] top-1/2 -left-1 -translate-y-1/2 rotate-45 w-4 h-4" />
              </div>
            </div>
          ))}
          <span className="absolute w-1 h-full z-[1] bg-black" />
        </div>
      </div>
      <div className="w-[calc(100%-8rem)] flex-col md:flex-row h-full flex items-center justify-center gap-x-10">
        {content}
      </div>
    </div>
  );
}

export default ServicesPage;
