import React, { useContext, useEffect, useState } from "react";
// import { Form, Radio } from "semantic-ui-react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SelectDestination from "../components/SelectDestination";
import DestinationSelection from "../components/DestinationSelection";
import PassengerSelection from "../components/PassengerSelection";
import Calendar from "../toolbox/Calendar";
import DatePickerSelection from "../components/DatePickerSelection";
import ClassSelection from "../components/ClassSelection";
import { Button, Icon } from "semantic-ui-react";
import FlightTypeContext from "../context/CustomContext";
import ReturnOneway from "../components/ReturnOneway";
import DepartureSelection from "../components/DepartureSelection";
import MultiCity from "../components/MultiCity";

const availablePlace = [
  "Cavite",
  "Manila",
  "Roxas",
  "Puerto Princesa",
  "Baguio",
  "Bacolod",
  "Tuguegarao",
  "Basco",
  "Butuan",
  "Cotabato",
  "Cebu",
  "Camiguin",
  "Cagayan de Oro",
  "Catarman",
  "Calbayog",
  "Dumaguete",
  "Dipolog",
  "Davao",
  "San Jose",
  "Siargao",
  "Kalibo",
  "Laoag",
  "Legazpi",
  "Ozamiz",
  "Tacloban",
  "Busuanga",
  "Zamboanga",
];

function Booking() {
  const [radiosValue, setRadiosValue] = useState([
    {
      label: "Return",
      value: "return",
      checked: true,
    },
    {
      label: "One way",
      value: "one_way",
      checked: false,
    },
    {
      label: "Multi City",
      value: "multi_city",
      checked: false,
    },
  ]);
  const flightTypeContext = useContext(FlightTypeContext);

  return (
    <div className="w-full h-fit bg-light flex justify-center relative z-[3]">
      <div className="bg-white w-[70%] h-fit px-7 pt-7 pb-10 rounded-lg -translate-y-20 shadow-lg flex flex-col gap-y-2">
        <div className="flex gap-x-10">
          {radiosValue.map((radio, i) => {
            return (
              <FormControlLabel
                label={radio.label}
                key={i}
                checked={radio.checked}
                value={radio.value}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                }}
                onChange={() => {
                  setRadiosValue((curr) => {
                    return curr.map((raw) => {
                      if (raw.value === radio.value) {
                        return { ...raw, checked: true };
                      }
                      return { ...raw, checked: false };
                    });
                  });
                  flightTypeContext.setValue((curr) => radio.value);
                }}
                control={<Radio />}
              />
            );
          })}
        </div>
        {flightTypeContext.value === "multi_city" ? (
          <MultiCity />
        ) : (
          <ReturnOneway />
        )}
      </div>
    </div>
  );
}

export default Booking;
