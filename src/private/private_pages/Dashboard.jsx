import React, { useContext, useEffect, useState } from "react";
import Title from "../private_components/Title";
import { Button, Flag, Message } from "semantic-ui-react";
import { TbDotsVertical } from "react-icons/tb";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import { FcPaid } from "react-icons/fc";
import { AccountInformationContext } from "../../context/CustomContext";
import { CgSpinnerTwo } from "react-icons/cg";
import axios from "axios";
import { getGlobalUrl } from "../../functions/methods";
import { HiChevronDown } from "react-icons/hi";

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

const OneWayItem = ({ ...infos }) => {
  const [fromPlace, setFromPlace] = useState();
  const [toPlace, setToPlace] = useState();
  const [flightInfo, setFlightInfo] = useState();
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const flight = await axios.get(
          getGlobalUrl("/mia/api/get-oneway-flight/" + infos.id)
        );
        setFlightInfo(flight.data.data);
        const fromId = flight.data.data.from;
        const toId = flight.data.data.to;
        const fromPlace = await axios.get(
          getGlobalUrl("/mia/api/get-place-by-id/" + fromId)
        );
        const toPlace = await axios.get(
          getGlobalUrl("/mia/api/get-place-by-id/" + toId)
        );
        setFromPlace(fromPlace.data.data);
        setToPlace(toPlace.data.data);
      } catch (error) {
        console.log("irror");
      }
    };
    fetch();
  }, []);

  const getPassengers = () => {
    const passengers = [
      {
        label: "child",
        value: infos.child,
      },
      {
        label: "adult",
        value: infos.adult,
      },
      {
        label: "senior",
        value: infos.senior,
      },
      {
        label: "pwd",
        value: infos.pwd,
      },
    ];
    return passengers.filter((value) => value.value > 0);
  };

  if (!fromPlace || !toPlace) {
    return (
      <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
      <div className="w-full flex items-center justify-between">
        <p className="text-xl font-montserrat-bold-italic text-[#333]">
          One Way
        </p>
        {infos.status === "pending" ? (
          "Pending payment"
        ) : (
          <Tooltip title="Paid" arrow>
            <span>
              <FcPaid className="w-8 h-8" />
            </span>
          </Tooltip>
        )}
      </div>
      <hr />
      <div className="w-full overflow-x-scroll">
        <table className="w-full overflow-hidden rounded-md outline outline-1 outline-slate-300 mt-2">
          <thead>
            <tr className="[&>th]:py-3 rounded-md bg-main text-white font-montserrat-regular">
              <th>From</th>
              <th>To</th>
              <th>Departure Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center [&>td]:py-3 [&>td]:px-3 [&>td>div]:w-full [&>td>div]:justify-center [&>td>div]:text-center [&>td>div]:gap-x-2 [&>td>div]:flex [&>td>div]:items-center [&>td]:text-lg [&>td]:font-montserrat-bold [&>td]:bg-white">
              <td>
                {fromPlace.airport_name}{" "}
                <Flag name={fromPlace.code.toLowerCase()} />
              </td>
              <td>
                {toPlace.airport_name}{" "}
                <Flag name={toPlace.code.toLowerCase()} />
              </td>
              <td>{flightInfo.departure}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col pt-4 px-2">
        <div className="w-full flex items-center justify-between">
          <p className="text-lg font-montserrat-bold">
            Flight ID: {flightInfo.book_id}
          </p>
          <button onClick={() => setDetailsIsOpen(!detailsIsOpen)}>
            <HiChevronDown
              data-open={detailsIsOpen}
              className="w-7 h-7 duration-200 data-[open=true]:rotate-180"
            />
          </button>
        </div>
        <div
          data-open={detailsIsOpen}
          className="w-full h-fit grid grid-rows-[0fr] data-[open=true]:grid-rows-[1fr] duration-200"
        >
          <div className="w-full min-h-0 overflow-hidden">
            {getPassengers().map((passenger) => (
              <p key={passenger.label}>
                {passenger.label}: {passenger.value}
              </p>
            ))}
            <p>Class: {infos.class}</p>
            <p>Payment Method: {infos.payment_method.toUpperCase()}</p>
            <p>Total Payment: ₱{infos.total}</p>
            <p>Reference Number: {infos.reference}</p>
          </div>
        </div>
      </div>
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
        {infos.status === "done" ? (
          <Button color="green">Get Ticket</Button>
        ) : (
          <Tooltip title="Pending payment" arrow>
            <span>
              <Button disabled color="green">
                Get Ticket
              </Button>
            </span>
          </Tooltip>
        )}
        <Button color="red">Cancel Flight</Button>
      </div>
    </div>
  );
};

const ReturnItem = ({ ...infos }) => {
  const [fromPlace, setFromPlace] = useState();
  const [toPlace, setToPlace] = useState();
  const [flightInfo, setFlightInfo] = useState();
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const flight = await axios.get(
          getGlobalUrl("/mia/api/get-return-flight/" + infos.id)
        );
        setFlightInfo(flight.data.data);
        const fromId = flight.data.data.from;
        const toId = flight.data.data.to;
        const fromPlace = await axios.get(
          getGlobalUrl("/mia/api/get-place-by-id/" + fromId)
        );
        const toPlace = await axios.get(
          getGlobalUrl("/mia/api/get-place-by-id/" + toId)
        );
        setFromPlace(fromPlace.data.data);
        setToPlace(toPlace.data.data);
      } catch (error) {
        console.log("irror");
      }
    };
    fetch();
  }, []);

  const getPassengers = () => {
    const passengers = [
      {
        label: "child",
        value: infos.child,
      },
      {
        label: "adult",
        value: infos.adult,
      },
      {
        label: "senior",
        value: infos.senior,
      },
      {
        label: "pwd",
        value: infos.pwd,
      },
    ];
    return passengers.filter((value) => value.value > 0);
  };

  if (!fromPlace || !toPlace) {
    return (
      <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-5 border-2 gap-y-2 border-slate-400 rounded-md">
      <div className="w-full flex items-center justify-between">
        <p className="text-xl font-montserrat-bold-italic text-[#333]">
          Return
        </p>
        {infos.status === "pending" ? (
          "Pending payment"
        ) : (
          <Tooltip title="Paid" arrow>
            <span>
              <FcPaid className="w-8 h-8" />
            </span>
          </Tooltip>
        )}
      </div>
      <hr />
      <div className="w-full overflow-x-scroll">
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
            <tr className="text-center [&>td]:py-3 [&>td]:px-2 [&>td>div]:w-full [&>td>div]:justify-center [&>td>div]:text-center [&>td>div]:gap-x-2 [&>td>div]:flex [&>td>div]:items-center [&>td]:text-lg [&>td]:font-montserrat-bold [&>td]:bg-white">
              <td>
                {fromPlace.airport_name}{" "}
                <Flag name={fromPlace.code.toLowerCase()} />
              </td>
              <td>
                {toPlace.airport_name}{" "}
                <Flag name={toPlace.code.toLowerCase()} />
              </td>
              <td>{flightInfo.departure}</td>
              <td>{flightInfo.return}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col pt-4 px-2">
        <div className="w-full flex items-center justify-between">
          <p className="text-lg font-montserrat-bold">
            Flight ID: {flightInfo.book_id}
          </p>
          <button onClick={() => setDetailsIsOpen(!detailsIsOpen)}>
            <HiChevronDown
              data-open={detailsIsOpen}
              className="w-7 h-7 duration-200 data-[open=true]:rotate-180"
            />
          </button>
        </div>
        <div
          data-open={detailsIsOpen}
          className="w-full h-fit grid grid-rows-[0fr] data-[open=true]:grid-rows-[1fr] duration-200"
        >
          <div className="w-full min-h-0 overflow-hidden">
            {getPassengers().map((passenger) => (
              <p key={passenger.label}>
                {passenger.label}: {passenger.value}
              </p>
            ))}
            <p>Class: {infos.class}</p>
            <p>Payment Method: {infos.payment_method.toUpperCase()}</p>
            <p>Total Payment: ₱{infos.total}</p>
            <p>Reference Number: {infos.reference}</p>
          </div>
        </div>
      </div>
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
        {infos.status === "done" ? (
          <Button color="green">Get Ticket</Button>
        ) : (
          <Tooltip title="Pending payment" arrow>
            <span>
              <Button disabled color="green">
                Get Ticket
              </Button>
            </span>
          </Tooltip>
        )}
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
  const accountContext = useContext(AccountInformationContext);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doneFlight, setDoneFlight] = useState([]);
  const [cancelledFlight, setCancelledFlight] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const pendingFlight = await axios.get(
          getGlobalUrl(
            `/mia/api/get-flights/${accountContext.value.id}/pending`
          )
        );
        const doneFlightTemp = await axios.get(
          getGlobalUrl(`/mia/api/get-flights/${accountContext.value.id}/done`)
        );
        const cancelledFlightTemp = await axios.get(
          getGlobalUrl(
            `/mia/api/get-flights/${accountContext.value.id}/cancelled`
          )
        );
        setFlights(pendingFlight.data.data);
        setDoneFlight(doneFlightTemp.data.data);
        setCancelledFlight(cancelledFlightTemp.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Title label="Dashboard" />
      <div className="w-full grid grid-cols-3 gap-x-3">
        <Item
          title="Done Flight"
          value={doneFlight.length}
          className="bg-blue-500"
        />
        <Item
          title="Pending Flight"
          value={flights.length}
          className="bg-green-500"
        />
        <Item
          title="Cancelled Flight"
          value={cancelledFlight.length}
          className="bg-orange-700"
        />
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
        {loading && (
          <div className="w-full flex items-center flex-col gap-y-3 py-10">
            <CgSpinnerTwo className="w-14 h-14 animate-spin" />
            <p>Loading...</p>
          </div>
        )}
        {!loading && flights.length === 0 ? (
          <div className="text-2xl">empty</div>
        ) : (
          <>
            {flights.map((flight) => {
              if (flight.type === "return") {
                return <ReturnItem key={flight.id} {...flight} />;
              } else if (flight.type === "one_way") {
                return <OneWayItem key={flight.id} {...flight} />;
              }
            })}
          </>
        )}
        {/* <ReturnItem /> */}
        {/* <OneWayItem />
        <MultiCityItem /> */}
      </div>
    </>
  );
}

export default Dashboard;
