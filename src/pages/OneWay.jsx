import React, { useContext, useEffect, useState } from "react";
import { Button, Flag } from "semantic-ui-react";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { BookDataContext, PaymentPopupContext } from "../context/CustomContext";
import useCookies from "../hooks/useCookies";
import axios from "axios";
import { getGlobalUrl } from "../functions/methods";
import { Placeholder } from "semantic-ui-react";
import { CgSpinnerTwo } from "react-icons/cg";
import { HiChevronDown } from "react-icons/hi";

const List = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-montserrat-regular text-slate-500">
        {title}
      </p>
      <p className="text-2xl">{description}</p>
    </div>
  );
};

const Con = ({ date = "", data }) => {
  if (!data) {
    return (
      <Placeholder className="col-span-3" fluid>
        <Placeholder.Image />
      </Placeholder>
    );
  }

  return (
    <div className="flex flex-col p-5 gap-y-2 col-span-3">
      <div className="w-full flex justify-between mb-2 items-center border-b border-b-slate-400 pb-1">
        <p className="text-lg font-montserrat-bold">
          From {date && `(${date})`}
        </p>
        {data.code && <Flag name={data.code.toLowerCase()} />}
      </div>
      <List description={data.airport_name} title="Airport" />
      <List description={data.country} title="Country" />
      <List description={data.location} title="Location" />
    </div>
  );
};

function OneWay() {
  const navigate = useNavigate();
  const { getCookie, removeCookie } = useCookies("oneway_book");
  const [passengerIsOpen, setPassengerIsOpen] = useState(false);
  const [bookData, setBookData] = useState(() => {
    const cookieData = getCookie();
    if (!cookieData) return null;
    return JSON.parse(cookieData);
  });
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [prices, setPrices] = useState();
  const paymentContext = useContext(PaymentPopupContext);

  useEffect(() => {
    const fetch = async () => {
      const fromPlace = await axios.get(
        getGlobalUrl("/mia/api/get-place-by-id/" + bookData.from)
      );
      const toPlace = await axios.get(
        getGlobalUrl("/mia/api/get-place-by-id/" + bookData.to)
      );
      const prices = await axios.get(getGlobalUrl("/mia/api/get-prices"));
      setFromData(fromPlace.data.data);
      setToData(toPlace.data.data);
      setPrices(prices.data.prices);
    };
    fetch();
  }, []);

  const getTotalPassenger = () => {
    const { adult, child, pwd, senior } = bookData.passengers;
    return adult + child + pwd + senior;
  };

  // top
  if (!bookData || !prices) {
    return (
      <div className="w-full h-screen bg-light flex items-center flex-col gap-y-3 justify-center">
        <CgSpinnerTwo className="w-10 h-10 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  const getTotalPassengerPrice = () => {
    const { adult, child, pwd, senior } = bookData.passengers;
    const childTotal = prices.children_price * child;
    const adultTotal = prices.adult_price * adult;
    const seniorTotal = prices.senior_price * senior;
    const pwdTotal = prices.pwd_price * pwd;
    return childTotal + adultTotal + seniorTotal + pwdTotal;
  };

  const getClassPrice = () => {
    let price;
    switch (bookData.class.toLowerCase()) {
      case "economy":
        price = prices.economy_price;
        break;
      case "premium economy":
        price = prices.premium_class_price;
        break;
      case "business":
        price = prices.business_price;
        break;
    }
    return price;
  };

  const getFlightPrice = () => {
    return bookData.flight.price;
  };

  const getTotalPrice = () => {
    return getTotalPassengerPrice() + getClassPrice() + getFlightPrice();
  };

  const getPassengers = (passengers) => {
    const outputArray = [];
    for (const [key, num] of Object.entries(passengers)) {
      if (num > 0) {
        outputArray.push({ key, num });
      }
    }
    return outputArray;
  };

  const getPassengerPriceByKey = (key) => {
    let price;
    switch (key) {
      case "child":
        price = prices.children_price;
        break;
      case "adult":
        price = prices.adult_price;
        break;
      case "senior":
        price = prices.senior_price;
        break;
      case "pwd":
        price = prices.pwd_price;
        break;
    }
    return price;
  };

  const submitBookEvent = () => {
    paymentContext.setValue((curr) => ({
      state: true,
      total: getTotalPrice(),
      type: "one-way",
    }));
  };

  return (
    <div className="w-full h-screen bg-light p-pad flex flex-col gap-y-10 overflow-y-scroll">
      <header className="w-full flex items-center justify-between">
        <span className="text-3xl flex items-center gap-x-3 font-montserrat-black text-green-500 uppercase">
          available flight found <FaCircleCheck className="w-7 h-7" />
        </span>
        <Button
          onClick={() => {
            removeCookie();
            navigate("/");
          }}
          color="blue"
          icon="angle left"
          content="Back to homepage"
        />
      </header>
      <div className="w-full">
        <div className="w-full grid grid-cols-7">
          <Con date={bookData.depart} data={fromData} />
          <div className="flex items-center col-span-1 flex-col">
            <p className="text-base font-montserrat-bold">One way flight</p>
            <FaArrowRightLong className="w-10 min-w-[2.5rem] h-9 mt-4" />
            <p className="mt-5 text-lg">8AM - 6PM</p>
          </div>
          <Con data={toData} />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-y-1">
          <div
            onClick={() => setPassengerIsOpen(!passengerIsOpen)}
            className="text-2xl w-fit cursor-pointer flex flex-col group"
          >
            <div className="flex items-center w-fit gap-x-1">
              <span className="select-none">
                {getTotalPassenger()}{" "}
                {getTotalPassenger().length > 1 ? "Passengers" : "Passenger"} ={" "}
                <b>₱{getTotalPassengerPrice()}</b>
              </span>
              <HiChevronDown
                data-open={passengerIsOpen}
                className="w-7 h-7 duration-150 data-[open=true]:rotate-180 hidden group-hover:block data-[open=true]:block text-slate-700"
              />
            </div>
            <div
              data-open={passengerIsOpen}
              className="grid data-[open=false]:grid-rows-[0fr] duration-150 data-[open=true]:grid-rows-[1fr] overflow-hidden"
            >
              <ul
                data-open={passengerIsOpen}
                className="w-full min-h-0 text-base px-3 py-0 duration-150 data-[open=true]:py-3 text-slate-700"
              >
                {getPassengers(bookData.passengers).map((passenger) => {
                  return (
                    <li className="" key={passenger.key}>
                      {passenger.key} = ₱{getPassengerPriceByKey(passenger.key)}{" "}
                      x {passenger.num}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="text-2xl">
            {bookData.class} = <b>₱{getClassPrice()}</b>
          </div>
          <div className="text-2xl">
            Flight = <b>₱{getFlightPrice()}</b>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 justify-start">
          <p className="text-3xl">Total: ₱{getTotalPrice()}</p>
          <Button onClick={submitBookEvent} color="green" fluid>
            BOOK NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OneWay;
