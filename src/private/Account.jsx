import React, { useContext, useState } from "react";
import AccountHeader from "./AccountHeader";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { HiMiniChevronRight } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AccountDrawerContext } from "../context/CustomContext";
import { Button, Message } from "semantic-ui-react";
import { TbDotsVertical } from "react-icons/tb";

const Title = ({ label }) => (
  <>
    <h1 className="text-3xl font-montserrat-black">{label}</h1>
    <div className="w-full h-[1px] bg-slate-400" />
  </>
);

const Item = ({ title, value, className }) => (
  <div className={"flex h-fit bg-main p-10 text-white rounded-md " + className}>
    <div className="flex w-[calc(100%-8rem)] h-fit flex-col gap-y-2">
      <p
        title={title}
        className="text-base font-montserrat-italic uppercase truncate"
      >
        {title}
      </p>
      <p title={value} className="text-5xl font-montserrat-black truncate">
        {value}
      </p>
    </div>
    <div className="w-32 max-h-full">
      <img className="w-full h-full object-cover" src="/images/plane.png" />
    </div>
  </div>
);

const MultiCityFlight = ({
  flightNumber = 1,
  from,
  fromFlag,
  to,
  toFlag,
  departure,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <p className="font-montserrat-bold">Flight {flightNumber}</p>
      <table className="w-full overflow-hidden rounded-md outline outline-1 outline-slate-300 mt-2">
        <thead>
          <tr className="[&>th]:py-3 rounded-md bg-main text-white font-montserrat-regular">
            <th>From</th>
            <th>To</th>
            <th>Departure Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center [&>td]:py-3 [&>td>div]:w-full [&>td>div]:justify-center [&>td>div]:text-center [&>td>div]:gap-x-2 [&>td>div]:flex [&>td>div]:items-center [&>td]:text-lg [&>td]:font-montserrat-bold [&>td]:bg-white">
            <td>
              <div>
                {" "}
                {from} {fromFlag && <img className="w-5 h-4" src={fromFlag} />}{" "}
              </div>
            </td>
            <td>
              <div>
                {" "}
                {to} {toFlag && <img className="w-5 h-4" src={toFlag} />}{" "}
              </div>
            </td>
            <td>{departure}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ReturnItem = () => {
  return (
    <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
      <h1 className="text-xl font-montserrat-bold-italic text-[#333]">
        Return
      </h1>
      <hr />
      <table className="w-full overflow-hidden rounded-md outline outline-1 outline-slate-300 mt-2">
        <thead>
          <tr className="[&>th]:py-3 rounded-md bg-main text-white font-montserrat-regular">
            <th>From</th>
            <th>To</th>
            <th>Departure Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center [&>td]:py-3 [&>td>div]:w-full [&>td>div]:justify-center [&>td>div]:text-center [&>td>div]:gap-x-2 [&>td>div]:flex [&>td>div]:items-center [&>td]:text-lg [&>td]:font-montserrat-bold [&>td]:bg-white">
            <td>
              <div>
                {" "}
                Manila <img
                  className="w-5 h-4"
                  src="/flags/philippines.png"
                />{" "}
              </div>
            </td>
            <td>
              <div>
                {" "}
                Cavite <img
                  className="w-5 h-4"
                  src="/flags/philippines.png"
                />{" "}
              </div>
            </td>
            <td>July 12, 2023 | 8:00 AM</td>
            <td>July 15, 2023 | 8:00 AM</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-5 mb-2">
        <Message
          warning
          header="Important"
          content="Not attending the scheduled departure briefing may lead to the forfeiture of your payment or necessitate the rescheduling of your flight. It is crucial to prioritize attendance to avoid any inconvenience and ensure a seamless travel experience."
        />
        <Message
          info
          header="Note"
          content="Should you desire to make changes to your destination or adjust the travel date, I highly recommend initiating a new booking to ensure a seamless and hassle-free process."
        />
      </div>
      <div className="w-full flex justify-end">
        <Button color="red">Cancel Flight</Button>
      </div>
    </div>
  );
};

const OneWayItem = () => {
  return (
    <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
      <h1 className="text-xl font-montserrat-bold-italic text-[#333]">
        One Way
      </h1>
      <hr />
      <table className="w-full overflow-hidden rounded-md outline outline-1 outline-slate-300 mt-2">
        <thead>
          <tr className="[&>th]:py-3 rounded-md bg-main text-white font-montserrat-regular">
            <th>From</th>
            <th>To</th>
            <th>Departure Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center [&>td]:py-3 [&>td>div]:w-full [&>td>div]:justify-center [&>td>div]:text-center [&>td>div]:gap-x-2 [&>td>div]:flex [&>td>div]:items-center [&>td]:text-lg [&>td]:font-montserrat-bold [&>td]:bg-white">
            <td>
              <div>
                {" "}
                Manila <img
                  className="w-5 h-4"
                  src="/flags/philippines.png"
                />{" "}
              </div>
            </td>
            <td>
              <div>
                {" "}
                Cavite <img
                  className="w-5 h-4"
                  src="/flags/philippines.png"
                />{" "}
              </div>
            </td>
            <td>July 12, 2023 | 8:00 AM</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-5 mb-2">
        <Message
          warning
          header="Important"
          content="Not attending the scheduled departure briefing may lead to the forfeiture of your payment or necessitate the rescheduling of your flight. It is crucial to prioritize attendance to avoid any inconvenience and ensure a seamless travel experience."
        />
        <Message
          info
          header="Note"
          content="Should you desire to make changes to your destination or adjust the travel date, I highly recommend initiating a new booking to ensure a seamless and hassle-free process."
        />
      </div>
      <div className="w-full flex justify-end">
        <Button color="red">Cancel Flight</Button>
      </div>
    </div>
  );
};

const MultiCityItem = () => {
  const tempFlag = "/flags/philippines.png";

  return (
    <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
      <h1 className="text-xl font-montserrat-bold-italic text-[#333]">
        Multi City
      </h1>
      <hr />
      <MultiCityFlight
        flightNumber={1}
        from="Cavite"
        to={"Manila"}
        fromFlag={tempFlag}
        toFlag={tempFlag}
        departure="July 12, 2023"
      />
      <MultiCityFlight
        flightNumber={2}
        from="Cavite"
        to={"Manila"}
        fromFlag={tempFlag}
        toFlag={tempFlag}
        departure="July 13, 2023"
      />
      <MultiCityFlight
        flightNumber={3}
        from="Cavite"
        to={"Manila"}
        fromFlag={tempFlag}
        toFlag={tempFlag}
        departure="July 14, 2023"
      />
      <div className="mt-5 mb-2">
        <Message
          warning
          header="Important"
          content="Not attending the scheduled departure briefing may lead to the forfeiture of your payment or necessitate the rescheduling of your flight. It is crucial to prioritize attendance to avoid any inconvenience and ensure a seamless travel experience."
        />
        <Message
          info
          header="Note"
          content="Should you desire to make changes to your destination or adjust the travel date, I highly recommend initiating a new booking to ensure a seamless and hassle-free process."
        />
      </div>
      <div className="w-full flex justify-end">
        <Button color="red">Cancel Flight</Button>
      </div>
    </div>
  );
};

const ContentDashboard = () => {
  return (
    <>
      <Title label="Dashboard" />
      <div className="w-full grid grid-cols-3 gap-x-3">
        <Item title="Booked" value={30} className="bg-blue-500" />
        <Item title="Pending Flight" value={3} className="bg-green-500" />
        <Item title="Highlights" value={2293} className="bg-orange-700" />
      </div>
      <div className="w-full h-fit p-5 gap-y-2 bg-white shadow-md rounded-md flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-base font-montserrat-bold text-slate-700">
            Pending flight
          </p>
          <div>
            <TbDotsVertical className="w-6 h-6 text-black cursor-pointer" />
          </div>
        </div>
        <ReturnItem />
        <OneWayItem />
        <MultiCityItem />
      </div>
    </>
  );
};

const ContentProfile = () => {
  return (
    <>
      <Title label="Profile" />
    </>
  );
};

const ContentSettings = () => {
  return (
    <>
      <Title label="Settings" />
    </>
  );
};

function Account() {
  const [drawerButtons, setDrawerButtons] = useState([
    {
      key: 1,
      label: "Dashboard",
      Icon: MdSpaceDashboard,
      selected: true,
      element: <ContentDashboard />,
    },
    {
      key: 2,
      label: "Profile",
      Icon: IoMdPerson,
      selected: false,
      element: <ContentProfile />,
    },
    {
      key: 3,
      label: "Settings",
      Icon: IoMdSettings,
      selected: false,
      element: <ContentSettings />,
    },
  ]);
  const [element, setElement] = useState(<ContentDashboard />);

  return (
    <AccountDrawerContext.Provider
      value={{
        setDrawerButtons: setDrawerButtons,
        setElement: setElement,
      }}
    >
      <div className="w-full h-screen bg-light">
        <AccountHeader />
        <div className="w-full h-[calc(100%-5rem)] flex">
          <div className="w-72 h-full bg-white shadow-md p-3">
            {drawerButtons.map((data) => (
              <div
                onClick={() => {
                  setDrawerButtons((curr) => {
                    return curr.map((btn) => {
                      if (btn.key === data.key) {
                        return { ...btn, selected: true };
                      }
                      return { ...btn, selected: false };
                    });
                  });
                  setElement(data.element);
                }}
                data-selected={data.selected}
                key={data.key}
                className="w-full select-none data-[selected=true]:bg-main data-[selected=true]:text-white group h-14 rounded-md duration-100 flex items-center justify-between px-3 hover:bg-slate-100 text-base cursor-pointer text-[#222]"
              >
                <div className="flex items-center gap-x-2">
                  {data.Icon && <data.Icon className="w-6 h-6" />}
                  {data.label}
                </div>
                <HiMiniChevronRight
                  data-selected={data.selected}
                  className="w-6 h-6 opacity-0 data-[selected=true]:text-white group-hover:opacity-100 text-[#222] duration-100"
                />
              </div>
            ))}
            <Link
              className="w-full group h-14 rounded-md duration-100 flex items-center justify-between px-3 select-none hover:bg-slate-100 text-base cursor-pointer text-[#222] hover:text-[#222]"
              to="/"
            >
              <div className="flex items-center gap-x-2">
                <IoArrowBack className="w-6 h-6" />
                Back
              </div>
            </Link>
          </div>
          <div className="w-[calc(100%-18rem)] h-full flex flex-col gap-y-5 p-[2rem] overflow-y-scroll">
            {element}
          </div>
        </div>
      </div>
    </AccountDrawerContext.Provider>
  );
}

export default Account;
