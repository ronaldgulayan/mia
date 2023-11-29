import React, { useContext, useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FlightTypeContext,
  SigninPopupContext,
} from "../context/CustomContext";
import ReturnOneway from "../components/ReturnOneway";
import MultiCity from "../components/MultiCity";
import CustomLink from "../toolbox/CustomLink";

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

function BookingPage() {
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
  const signinPopupContext = useContext(SigninPopupContext);

  return (
    <div className="w-full h-fit bg-light flex justify-center relative z-[3]">
      <div className="bg-white w-[70%] h-fit px-7 pt-7 pb-10 rounded-lg -translate-y-20 shadow-lg flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-5">
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
          <CustomLink onClick={() => signinPopupContext.setValue(true)}>
            Sign In Account First
          </CustomLink>
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

export default BookingPage;
