import React, { useState } from "react";
import { FlightTypeContext, SigninPopupContext } from "./CustomContext";

function ContextWrapper({ children }) {
  const [flightType, setFlightType] = useState("return");
  const [visibleSigninPopup, setVisibleSigninPopup] = useState(false);
  return (
    <>
      <FlightTypeContext.Provider
        value={{ value: flightType, setValue: setFlightType }}
      >
        <SigninPopupContext.Provider
          value={{
            value: visibleSigninPopup,
            setValue: setVisibleSigninPopup,
          }}
        >
          {children}
        </SigninPopupContext.Provider>
      </FlightTypeContext.Provider>
    </>
  );
}

export default ContextWrapper;
