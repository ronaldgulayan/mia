import React, { useState } from "react";
import {
  FlightTypeContext,
  RegistrationAlertBoxContext,
  SearchingContext,
  SigninPopupContext,
  AccountPopupContext,
} from "./CustomContext";

function ContextWrapper({ children }) {
  const [flightType, setFlightType] = useState("return");
  const [visibleSigninPopup, setVisibleSigninPopup] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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
          <SearchingContext.Provider
            value={{
              value: isSearching,
              setValue: setIsSearching,
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
                {children}
              </AccountPopupContext.Provider>
            </RegistrationAlertBoxContext.Provider>
          </SearchingContext.Provider>
        </SigninPopupContext.Provider>
      </FlightTypeContext.Provider>
    </>
  );
}

export default ContextWrapper;
