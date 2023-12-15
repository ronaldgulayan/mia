import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FlightTypeContext,
  SigninPopupContext,
} from "../context/CustomContext";
import ReturnOneway from "../components/ReturnOneway";
import MultiCity from "../components/MultiCity";
import CustomLink from "../toolbox/CustomLink";
import useCookies from "../hooks/useCookies";

function BookingPage() {
  const { getCookie } = useCookies("token");
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

  useEffect(() => {
    setRadiosValue((curr) => {
      const type = flightTypeContext.value;
      return curr.map((radio) => {
        if (radio.value === type) {
          return { ...radio, checked: true };
        }
        return { ...radio, checked: false };
      });
    });
  }, []);

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
          {!getCookie() && (
            <CustomLink onClick={() => signinPopupContext.setValue(true)}>
              Sign In Account First
            </CustomLink>
          )}
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
