import React, { useState } from "react";
import {
  FlightTypeContext,
  RegistrationAlertBoxContext,
  SigninPopupContext,
  AccountPopupContext,
  LoadingContext,
} from "./CustomContext";

function ContextWrapper({ children }) {
  const [flightType, setFlightType] = useState("return");
  const [visibleSigninPopup, setVisibleSigninPopup] = useState(false);
  const [registrationAlertBoxContext, setRegistrationAlertBoxContext] =
    useState({
      state: false,
      title: "Title",
      error: false,
      message: "Message...",
    });
  const [accountAlertBoxContext, setAccountAlertBoxContext] = useState({
    state: false,
    title: "Title",
    error: false,
    message: "Message...",
  });
  const [loadingData, setLoadingData] = useState({
    state: false,
    label: "Loading...",
  });

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
          <RegistrationAlertBoxContext.Provider
            value={{
              value: registrationAlertBoxContext,
              setValue: setRegistrationAlertBoxContext,
            }}
          >
            <AccountPopupContext.Provider
              value={{
                value: accountAlertBoxContext,
                setValue: setAccountAlertBoxContext,
              }}
            >
              <LoadingContext.Provider
                value={{
                  value: loadingData,
                  setValue: setLoadingData,
                }}
              >
                {children}
              </LoadingContext.Provider>
            </AccountPopupContext.Provider>
          </RegistrationAlertBoxContext.Provider>
        </SigninPopupContext.Provider>
      </FlightTypeContext.Provider>
    </>
  );
}

export default ContextWrapper;
