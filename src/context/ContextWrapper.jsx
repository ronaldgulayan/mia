import React, { useContext, useEffect, useState } from "react";
import {
  FlightTypeContext,
  RegistrationAlertBoxContext,
  SigninPopupContext,
  AccountPopupContext,
  LoadingContext,
  BookingContext,
  AccountInformationContext,
  BookDataContext,
  PaymentPopupContext,
  SuccessContext,
} from "./CustomContext";
import axios from "axios";
import { getGlobalUrl } from "../functions/methods";
import useCookies from "../hooks/useCookies";
import { CgSpinnerTwo } from "react-icons/cg";
import { BsDatabaseFillX } from "react-icons/bs";
import { Button } from "semantic-ui-react";
import { LuServerCog } from "react-icons/lu";

function ContextWrapper({ children }) {
  const { getCookie } = useCookies("token");
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
  const [bookingVisibility, setBookingVisibility] = useState(false);
  const [accountInfo, setAccountInfo] = useState();
  const [bookData, setBookData] = useState();
  const [start, setStart] = useState({
    load: true,
    message: "Checking connection...",
    Icon: <CgSpinnerTwo className="w-14 h-14 animate-spin text-white" />,
  });
  const [isStartError, setIsStartError] = useState();
  const [paymentPopupData, setPaymentPopupData] = useState({
    state: false,
    total: 0,
    type: null,
  });
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  useEffect(() => {
    axios
      .post(getGlobalUrl("/mia/api/check-connection"))
      .then((value) => {
        const status = value.data.status;
        if (status === 500) {
          setStart((curr) => ({
            load: true,
            message: value.data.message,
            Icon: <BsDatabaseFillX className="w-14 h-14 text-white" />,
          }));
          setIsStartError(true);
        } else if (status === 200) {
          axios
            .get(getGlobalUrl("/mia/api/decode-token/" + getCookie()))
            .then((token_value) => {
              setAccountInfo(token_value.data.data);
              setStart((curr) => ({
                ...curr,
                load: false,
              }));
              setIsStartError(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setStart((curr) => ({
          load: true,
          message:
            "We're sorry, but the server is currently offline. Please try again later.",
          Icon: <LuServerCog className="w-14 h-14 text-white" />,
        }));
        setIsStartError(true);
      });
  }, []);

  if (start.load) {
    return (
      <div className="bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat w-full h-screen">
        <div className="w-full h-full bg-[#0005] flex items-center backdrop-blur-[3px] justify-center flex-col gap-y-4">
          {start.Icon}
          <p className="text-xl text-white text-center px-10">
            {start.message}
          </p>
          {isStartError && (
            <Button
              onClick={() => {
                window.location.reload();
              }}
              icon="refresh"
              content="Retry"
            />
          )}
        </div>
      </div>
    );
  }

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
                <BookingContext.Provider
                  value={{
                    value: bookingVisibility,
                    setValue: setBookingVisibility,
                  }}
                >
                  <AccountInformationContext.Provider
                    value={{
                      value: accountInfo,
                      setValue: setAccountInfo,
                    }}
                  >
                    <BookDataContext.Provider
                      value={{
                        value: bookData,
                        setValue: setBookData,
                      }}
                    >
                      <PaymentPopupContext.Provider
                        value={{
                          value: paymentPopupData,
                          setValue: setPaymentPopupData,
                        }}
                      >
                        <SuccessContext.Provider
                          value={{
                            value: isSuccessPopupVisible,
                            setValue: setIsSuccessPopupVisible,
                          }}
                        >
                          {children}
                        </SuccessContext.Provider>
                      </PaymentPopupContext.Provider>
                    </BookDataContext.Provider>
                  </AccountInformationContext.Provider>
                </BookingContext.Provider>
              </LoadingContext.Provider>
            </AccountPopupContext.Provider>
          </RegistrationAlertBoxContext.Provider>
        </SigninPopupContext.Provider>
      </FlightTypeContext.Provider>
    </>
  );
}

export default ContextWrapper;
