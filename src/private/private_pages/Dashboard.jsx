import React, { useState } from "react";
import Title from "../private_components/Title";
import { Button, Message } from "semantic-ui-react";
import { TbDotsVertical } from "react-icons/tb";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import { FcPaid } from "react-icons/fc";

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
      <div className="w-full flex items-center justify-between">
        <p className="text-xl font-montserrat-bold-italic text-[#333]">
          Return
        </p>
        <Tooltip title="Paid" arrow>
          <span>
            <FcPaid className="w-8 h-8" />
          </span>
        </Tooltip>
      </div>
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
      <div className="my-2 flex flex-col gap-y-2">
        <Alert severity="warning">
          Not attending the scheduled departure briefing may lead to the
          forfeiture of your payment or necessitate the rescheduling of your
          flight. It is crucial to prioritize attendance to avoid any
          inconvenience and ensure a seamless travel experience.
        </Alert>
        <Alert severity="info">
          Should you desire to make changes to your destination or adjust the
          travel date, I highly recommend initiating a new booking to ensure a
          seamless and hassle-free process.
        </Alert>
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
      <div className="w-full flex items-center justify-between">
        <p className="text-xl font-montserrat-bold-italic text-[#333]">
          One Way
        </p>
        <Tooltip title="Paid" arrow>
          <span>
            <FcPaid className="w-8 h-8" />
          </span>
        </Tooltip>
      </div>
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
      <div className="my-2 flex flex-col gap-y-2">
        <Alert severity="warning">
          Not attending the scheduled departure briefing may lead to the
          forfeiture of your payment or necessitate the rescheduling of your
          flight. It is crucial to prioritize attendance to avoid any
          inconvenience and ensure a seamless travel experience.
        </Alert>
        <Alert severity="info">
          Should you desire to make changes to your destination or adjust the
          travel date, I highly recommend initiating a new booking to ensure a
          seamless and hassle-free process.
        </Alert>
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
      <div className="w-full flex items-center justify-between">
        <p className="text-xl font-montserrat-bold-italic text-[#333]">
          Multi City
        </p>
        <Tooltip title="Paid" arrow>
          <span>
            <FcPaid className="w-8 h-8" />
          </span>
        </Tooltip>
      </div>
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
      <div className="my-2 flex flex-col gap-y-2">
        <Alert severity="warning">
          Not attending the scheduled departure briefing may lead to the
          forfeiture of your payment or necessitate the rescheduling of your
          flight. It is crucial to prioritize attendance to avoid any
          inconvenience and ensure a seamless travel experience.
        </Alert>
        <Alert severity="info">
          Should you desire to make changes to your destination or adjust the
          travel date, I highly recommend initiating a new booking to ensure a
          seamless and hassle-free process.
        </Alert>
      </div>
      <div className="w-full flex justify-end">
        <Button color="red">Cancel Flight</Button>
      </div>
    </div>
  );
};

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

function Dashboard() {
  const [flights, setFlights] = useState([
    {
      type: "return",
      from: "Cavite",
      to: "Manila",
      departure: "",
      return: "",
      paid: "",
      date: "",
    },
  ]);

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
}

export default Dashboard;
