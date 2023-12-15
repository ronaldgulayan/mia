import React, { useContext, useEffect, useState } from "react";
import DestinationSelection from "./DestinationSelection";
import PassengerSelection from "./PassengerSelection";
import DatePickerSelection from "./DatePickerSelection";
import ClassSelection from "./ClassSelection";
import {
  AccountInformationContext,
  BookDataContext,
  BookingContext,
  FlightTypeContext,
  LoadingContext,
  RegistrationAlertBoxContext,
} from "../context/CustomContext";
import axios from "axios";
import { convertMonthToNumber, getGlobalUrl } from "../functions/methods";
import { useNavigate } from "react-router-dom";
import useCookies from "../hooks/useCookies";

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
  const bookingContext = useContext(BookingContext);
  const alertboxContext = useContext(RegistrationAlertBoxContext);
  const accountInfoContext = useContext(AccountInformationContext);
  const bookDataContext = useContext(BookDataContext);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const returnCookie = useCookies("return_book");
  const oneWayCookie = useCookies("oneway_book");

  const getTotalPassenger = () => {
    const { child, adult, senior, pwd } = passengerValue;
    return child + adult + senior + pwd;
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(getGlobalUrl() + "/mia/api/places");
        setList(response.data.data);
      } catch (error) {
        // error
        setList([]);
      }
    };
    fetch();
  }, []);

  function isValidDate(departDate, returnDate) {
    const departTimestamp = new Date(departDate).getTime();
    const returnTimestamp = new Date(returnDate).getTime();

    return returnTimestamp >= departTimestamp;
  }

  const fixDate = (date) => {
    const month = convertMonthToNumber(date.split(" ")[0]);
    const day = Number(date.split(" ")[1].replace(",", ""));
    const year = Number(date.split(" ")[2]);
    return `${year}-${month}-${day}`;
  };

  const isDestinationExist = (destination) => {
    if (list.length === 0) return;
    return list.some((value) => {
      return value.airport_name.toLowerCase() == destination.toLowerCase();
    });
  };

  const displayError = (title = "", message = "") => {
    alertboxContext.setValue((curr) => ({
      ...curr,
      state: true,
      title: title,
      message: message,
      error: true,
    }));
  };

  const searchFlightEvent = () => {
    const type = flightTypeContext.value;

    if (!destinationValue.from || !destinationValue.to) {
      displayError("Invalid destination", "Please select a destination first.");
      return;
    }

    if (!isDestinationExist(destinationValue.from)) {
      displayError(
        "Invalid 'From' destination",
        "The destination you select/enter does not exist."
      );
      return;
    }

    if (!isDestinationExist(destinationValue.to)) {
      displayError(
        "Invalid 'To' destination",
        "The destination you select/enter does not exist."
      );
      return;
    }

    if (type === "return" && !dateValue.return) {
      displayError("Invalid 'Return' date", "Please select your return date.");
      return;
    }

    if (type === "return" && dateValue.depart === dateValue.return) {
      displayError(
        "Invalid date",
        "Departure date and return date cannot be same."
      );
      return;
    }

    if (
      type === "return" &&
      !isValidDate(fixDate(dateValue.depart), fixDate(dateValue.return))
    ) {
      displayError(
        "Invalid date",
        "Return date is earlier than the departure date."
      );
      return;
    }

    if (getTotalPassenger() === 0) {
      displayError(
        "Invalid passenger",
        "Please select at least one passenger."
      );
      return;
    }

    if (!classValue) {
      displayError("Invalid class", "Please select your class.");
      return;
    }

    if (!accountInfoContext.value) {
      displayError(
        "Login required",
        "To proceed with booking, please log in to your account. Kindly log in or sign up before attempting to book a service. Thank you!"
      );
      return;
    }

    loadingContext.setValue((curr) => {
      return {
        ...curr,
        state: true,
        label: "Searching available flights...",
      };
    });
    switch (type) {
      case "return":
        axios
          .get(getGlobalUrl("/mia/api/get-place-id/" + destinationValue.from))
          .then((fromId) => {
            axios
              .get(getGlobalUrl("/mia/api/get-place-id/" + destinationValue.to))
              .then((toId) => {
                axios
                  .get(
                    getGlobalUrl(
                      `/mia/api/search-available-flight/${fromId.data.id}/${toId.data.id}`
                    )
                  )
                  .then((flight) => {
                    window.setTimeout(() => {
                      const status = flight.data.status;
                      if (status === 500) {
                        window.alert("Database error.");
                      } else if (status === 404) {
                        displayError(
                          "No available flight found.",
                          "We're sorry, but we couldn't find any available flights for the selected route."
                        );
                      } else if (status === 200) {
                        const data = {
                          userId: accountInfoContext.value.id,
                          type: type,
                          from: fromId.data.id,
                          to: toId.data.id,
                          depart: dateValue.depart,
                          return: dateValue.return,
                          passengers: passengerValue,
                          class: classValue,
                          flight: flight.data.data,
                        };
                        returnCookie.setCookie(JSON.stringify(data));
                        navigate("/return");
                      }
                      loadingContext.setValue((curr) => ({
                        ...curr,
                        state: false,
                      }));
                    }, 3000);
                  });
              });
          })
          .catch(() => {
            displayError(
              "Server error",
              "Server is currently offline. Please try again later"
            );
            loadingContext.setValue((curr) => ({
              ...curr,
              state: false,
            }));
          });
        break;
      case "one_way":
        axios
          .get(getGlobalUrl("/mia/api/get-place-id/" + destinationValue.from))
          .then((fromId) => {
            axios
              .get(getGlobalUrl("/mia/api/get-place-id/" + destinationValue.to))
              .then((toId) => {
                axios
                  .get(
                    getGlobalUrl(
                      `/mia/api/search-available-flight/${fromId.data.id}/${toId.data.id}`
                    )
                  )
                  .then((flight) => {
                    window.setTimeout(() => {
                      const status = flight.data.status;
                      if (status === 500) {
                        window.alert("Database error.");
                      } else if (status === 404) {
                        displayError(
                          "No available flight found.",
                          "We're sorry, but we couldn't find any available flights for the selected route."
                        );
                      } else if (status === 200) {
                        const data = {
                          userId: accountInfoContext.value.id,
                          type: type,
                          from: fromId.data.id,
                          to: toId.data.id,
                          depart: dateValue.depart,
                          passengers: passengerValue,
                          class: classValue,
                          flight: flight.data.data,
                        };
                        oneWayCookie.setCookie(JSON.stringify(data));
                        navigate("/one-way");
                      }
                      loadingContext.setValue((curr) => ({
                        ...curr,
                        state: false,
                      }));
                    }, 3000);
                  });
              });
          })
          .catch(() => {
            displayError(
              "Server error",
              "Server is currently offline. Please try again later"
            );
            loadingContext.setValue((curr) => ({
              ...curr,
              state: false,
            }));
          });
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2">
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
