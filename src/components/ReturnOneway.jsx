import React, { useContext, useEffect, useState } from "react";
import DestinationSelection from "./DestinationSelection";
import PassengerSelection from "./PassengerSelection";
import DatePickerSelection from "./DatePickerSelection";
import ClassSelection from "./ClassSelection";
import { FlightTypeContext, LoadingContext } from "../context/CustomContext";
import { places } from "../assets/places.json";

function ReturnOneway() {
  const [destinationValue, setDestinationValue] = useState({
    from: null,
    to: null,
  });
  const [dateValue, setDateValue] = useState({ depart: null, return: null });
  const [classValue, setClassValue] = useState(null);
  const [passengerValue, setPassengerValue] = useState();
  const flightTypeContext = useContext(FlightTypeContext);
  const loadingContext = useContext(LoadingContext);

  const searchFlightEvent = () => {
    const type = flightTypeContext.value;
    switch (type) {
      case "return":
        break;
      case "one_way":
        break;
    }
    loadingContext.setValue((curr) => ({
      state: true,
      label: "Loading...",
    }));
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="w-full grid grid-cols-2 gap-x-2">
        <div className="flex flex-col gap-y-2">
          <DestinationSelection
            setParentValue={(value) => {
              setDestinationValue({ from: value[0], to: value[1] });
            }}
          />
          <PassengerSelection
            setParentValue={(value) => setPassengerValue(value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <DatePickerSelection
            setParentValue={(value) => {
              setDateValue((curr) => {
                if (value.side === "depart") {
                  return { ...curr, depart: value.date };
                }
                return { ...curr, return: value.date };
              });
            }}
          />
          <ClassSelection value={classValue} setValue={setClassValue} />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div></div>
        <div>
          <button
            onClick={searchFlightEvent}
            className="px-5 py-3 select-none rounded-lg hover:bg-main-hover bg-main active:bg-main-active text-white text-lg"
          >
            Search Flight
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReturnOneway;
