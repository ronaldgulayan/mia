import React, { useContext, useEffect, useState } from "react";
import DestinationSelection from "./DestinationSelection";
import DepartureSelection from "./DepartureSelection";
import { FaPlus } from "react-icons/fa";
import { v4 } from "uuid";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import PassengerSelection from "./PassengerSelection";
import ClassSelection from "./ClassSelection";
import { RegistrationAlertBoxContext } from "../context/CustomContext";

function MultiCity() {
  const alertboxContext = useContext(RegistrationAlertBoxContext);
  const [flights, setFlights] = useState([
    {
      key: crypto.randomUUID(),
      fromValue: "",
      toValue: "",
      departDate: "",
    },
    {
      key: crypto.randomUUID(),
      fromValue: "",
      toValue: "",
      departDate: "",
    },
  ]);

  const searchFlightEvent = () => {
    alertboxContext.setValue((curr) => ({
      state: true,
      title: "Unavailable",
      message:
        "The multi-city feature is temporarily unavailable due to maintenance. We apologize for any inconvenience.",
      error: false,
    }));
  };

  const setDestinationValue = (from, to, key) => {
    setFlights((curr) => {
      return curr.map((data) => {
        if (data.key === key) {
          return { ...data, fromValue: from, toValue: to };
        }
        return data;
      });
    });
  };

  const setDateValue = (date, key) => {
    setFlights((curr) => {
      return curr.map((data) => {
        if (data.key === key) {
          return { ...data, departDate: date };
        }
        return data;
      });
    });
  };

  return (
    <div className="w-full h-fit flex flex-col gap-y-5">
      {flights.map((data, i) => (
        <div
          style={{ zIndex: flights.length + 2 - i }}
          key={data.key}
          className="flex flex-col gap-y-1 relative"
        >
          <div className="w-full flex justify-between items-center">
            <span className="font-poppins text-xl">Flight {i + 1}</span>
          </div>
          <div className="w-full h-fit flex items-center gap-x-2">
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-y-2 gap-x-2">
              <DestinationSelection
                z={flights.length + 3 - i}
                setParentValue={([from, to]) =>
                  setDestinationValue(from, to, data.key)
                }
              />
              <DepartureSelection
                // z={flights.length + 2 - i}
                setParentValue={(value) => setDateValue(value, data.key)}
              />
            </div>
            {flights.length > 2 && (
              <button
                onClick={() => {
                  setFlights((curr) => {
                    if (curr.length <= 2) return curr;
                    return curr.filter((raw) => raw.key !== data.key);
                  });
                }}
              >
                <FaTrashCan className="w-8 h-8 text-blue" />
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="w-full relative z-[2] grid md:grid-cols-2 grid-cols-1 gap-y-2 gap-x-2">
        <PassengerSelection />
        <ClassSelection />
      </div>
      <div className="w-full md:flex grid grid-cols-2 gap-x-2 justify-between">
        <button
          onClick={() =>
            setFlights((curr) => {
              const newData = {
                key: crypto.randomUUID(),
                fromValue: "",
                toValue: "",
                departDate: "",
              };
              return [...curr, newData];
            })
          }
          className="px-5 py-3 flex items-center gap-x-2 hover:bg-main-hover bg-main active:bg-main-active text-white font-poppins rounded-md"
        >
          <FaPlus />
          Add Flight
        </button>
        <button
          onClick={searchFlightEvent}
          className="px-5 py-3 select-none rounded-md hover:bg-main-hover bg-main active:bg-main-active text-white font-poppins text-lg"
        >
          Search Flight
        </button>
      </div>
    </div>
  );
}

export default MultiCity;
