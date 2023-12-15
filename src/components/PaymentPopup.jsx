import React, { useContext, useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import {
  AccountPopupContext,
  LoadingContext,
  PaymentPopupContext,
  RegistrationAlertBoxContext,
  SuccessContext,
} from "../context/CustomContext";
import useCookies from "../hooks/useCookies";
import axios from "axios";
import { getGlobalUrl } from "../functions/methods";

const CloseButton = () => {
  const paymentContext = useContext(PaymentPopupContext);
  return (
    <button
      onClick={() => {
        paymentContext.setValue((curr) => ({
          ...curr,
          state: false,
        }));
      }}
      className="font-bold"
    >
      &#10005;
    </button>
  );
};

const Gcash = () => {
  const alertboxContext = useContext(RegistrationAlertBoxContext);
  const paymentContext = useContext(PaymentPopupContext);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { getCookie } = useCookies("oneway_book");
  const alertboxOkayCancelContext = useContext(AccountPopupContext);
  const loadingContext = useContext(LoadingContext);
  const successContext = useContext(SuccessContext);

  const alertBoxEvent = (data) => {
    if (data === "ok") {
      const cookieData = JSON.parse(getCookie());
      const data = {
        userId: cookieData.userId,
        type: cookieData.type,
        passengers: cookieData.passengers,
        _class: cookieData.class,
        total: paymentContext.value.total,
        reference: referenceNumber,
        from: cookieData.from,
        to: cookieData.to,
        departure: cookieData.depart,
        payment_method: "gcash",
      };
      loadingContext.setValue((curr) => ({
        state: true,
        label: "Loading...",
      }));
      axios
        .post(getGlobalUrl("/mia/api/book"), data)
        .then((value) => {
          if (value.data.status === 500) {
            alertboxContext.setValue((curr) => ({
              ...curr,
              state: true,
              title: "Error",
              message: "Something error. Please try again later",
              error: true,
            }));
          }
          if (value.data.status === 200) {
            successContext.setValue(true);
            paymentContext.setValue((curr) => ({
              ...curr,
              state: false,
            }));
          }
          loadingContext.setValue((curr) => ({
            ...curr,
            state: false,
          }));
        })
        .catch((err) => {
          alertboxContext.setValue((curr) => ({
            ...curr,
            state: true,
            title: "Error",
            message: "Something error. Please try again later",
            error: true,
          }));
          paymentContext.setValue((curr) => ({
            ...curr,
            state: false,
          }));
        });
    }
  };

  const submitEventHandler = () => {
    if (referenceNumber.length !== 12) {
      alertboxContext.setValue((curr) => ({
        ...curr,
        state: true,
        title: "Invalid Reference Number",
        message:
          "Please enter a valid 12-digit reference number. The reference number you provided should consist of exactly 12 digits.",
        error: true,
      }));
      return;
    }
    if (!/^\d+$/.test(referenceNumber)) {
      alertboxContext.setValue((curr) => ({
        state: true,
        title: "Invalid Reference Number",
        message:
          "The reference number should consist of numbers only. Please enter a valid reference number.",
        error: true,
      }));
      return;
    }
    // valid
    alertboxOkayCancelContext.setValue((curr) => ({
      state: true,
      title: "Confirmation",
      message: `Please make sure your reference number is correct (${referenceNumber}). Are you sure it is correct?`,
      error: false,
      submitEventHandler: alertBoxEvent,
    }));
  };

  return (
    <div className="w-80 h-fit bg-white rounded-md flex text-center flex-col items-center p-3">
      <div className="flex w-full justify-between px-2">
        <p className="text-base font-montserrat-bold">Scan to pay (Gcash)</p>
        <CloseButton />
      </div>
      <img
        draggable="false"
        className="w-72 h-72 object-cover select-none"
        src="/images/gcash-qr.jpg"
      />
      <p className="text-lg">or send your gcash payment to this number:</p>
      <p className="font-montserrat-bold text-xl">09384535499</p>
      <div className="flex items-center gap-x-1 mt-2">
        <Tooltip title="Enter your reference number here." arrow>
          <input
            onChange={(e) => setReferenceNumber(e.target.value)}
            value={referenceNumber}
            autoComplete="off"
            autoCorrect="off"
            type="text"
            className="w-full rounded-sm border border-slate-500 outline-none text-sm p-1 text-"
            placeholder="Reference number"
          />
        </Tooltip>
        <button
          onClick={submitEventHandler}
          className="w-fit text-white text-sm py-1 px-2 rounded-sm bg-green-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Paymaya = () => {
  const alertboxContext = useContext(RegistrationAlertBoxContext);
  const paymentContext = useContext(PaymentPopupContext);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { getCookie } = useCookies("return_book");
  const alertboxOkayCancelContext = useContext(AccountPopupContext);
  const loadingContext = useContext(LoadingContext);
  const successContext = useContext(SuccessContext);

  const alertBoxEvent = (data) => {
    if (data === "ok") {
      const cookieData = JSON.parse(getCookie());
      const data = {
        userId: cookieData.userId,
        type: cookieData.type,
        passengers: cookieData.passengers,
        _class: cookieData.class,
        total: paymentContext.value.total,
        reference: referenceNumber,
        from: cookieData.from,
        to: cookieData.to,
        departure: cookieData.depart,
        _return: cookieData.return,
        payment_method: "paymaya",
      };
      loadingContext.setValue((curr) => ({
        state: true,
        label: "Loading...",
      }));
      axios
        .post(getGlobalUrl("/mia/api/book"), data)
        .then((value) => {
          if (value.data.status === 500) {
            alertboxContext.setValue((curr) => ({
              ...curr,
              state: true,
              title: "Error",
              message: "Something error. Please try again later",
              error: true,
            }));
          }
          if (value.data.status === 200) {
            successContext.setValue(true);
            paymentContext.setValue((curr) => ({
              ...curr,
              state: false,
            }));
          }
          loadingContext.setValue((curr) => ({
            ...curr,
            state: false,
          }));
        })
        .catch((err) => {
          alertboxContext.setValue((curr) => ({
            ...curr,
            state: true,
            title: "Error",
            message: "Something error. Please try again later",
            error: true,
          }));
          paymentContext.setValue((curr) => ({
            ...curr,
            state: false,
          }));
        });
    }
  };

  const submitEventHandler = () => {
    if (referenceNumber.length !== 12) {
      alertboxContext.setValue((curr) => ({
        ...curr,
        state: true,
        title: "Invalid Reference Number",
        message:
          "Please enter a valid 12-digit reference number. The reference number you provided should consist of exactly 12 digits.",
        error: true,
      }));
      return;
    }
    if (!/^\d+$/.test(referenceNumber)) {
      alertboxContext.setValue((curr) => ({
        state: true,
        title: "Invalid Reference Number",
        message:
          "The reference number should consist of numbers only. Please enter a valid reference number.",
        error: true,
      }));
      return;
    }
    // valid
    alertboxOkayCancelContext.setValue((curr) => ({
      state: true,
      title: "Confirmation",
      message: `Please make sure your reference number is correct (${referenceNumber}). Are you sure it is correct?`,
      error: false,
      submitEventHandler: alertBoxEvent,
    }));
  };

  return (
    <div className="w-80 h-fit bg-white rounded-md flex text-center flex-col items-center p-3">
      <div className="flex w-full justify-between px-2">
        <p className="text-base font-montserrat-bold">Scan to pay (Paymaya)</p>
        <CloseButton />
      </div>
      <img
        draggable="false"
        className="w-72 h-72 object-cover select-none"
        src="/images/paymaya-qr.jpg"
      />
      <p className="text-lg">or send your paymaya payment to this number:</p>
      <p className="font-montserrat-bold text-xl">09384535499</p>
      <div className="flex items-center gap-x-1 mt-2">
        <Tooltip title="Enter your reference number here." arrow>
          <input
            onChange={(e) => setReferenceNumber(e.target.value)}
            value={referenceNumber}
            autoComplete="off"
            autoCorrect="off"
            type="text"
            className="w-full rounded-sm border border-slate-500 outline-none text-sm p-1 text-"
            placeholder="Reference number"
          />
        </Tooltip>
        <button
          onClick={submitEventHandler}
          className="w-fit text-white text-sm py-1 px-2 rounded-sm bg-green-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
// here na ako baket zero ( 0 ) ang pumapasok na total payment sa db
function PaymentPopup() {
  const paymentContext = useContext(PaymentPopupContext);
  const [element, setElement] = useState(<Gcash />);
  const [buttons, setButtons] = useState([
    {
      key: 1,
      label: "GCash",
      selected: true,
      element: <Gcash />,
    },
    {
      key: 2,
      label: "Paymaya",
      selected: false,
      element: <Paymaya />,
    },
  ]);

  return (
    <div
      data-state={paymentContext.value.state}
      className="w-full fixed z-[2] top-0 left-0 h-screen flex items-center justify-center bg-[#0008] backdrop-blur-sm pointer-events-none opacity-0 data-[state=true]:pointer-events-auto data-[state=true]:opacity-100 duration-200"
    >
      <div
        data-state={paymentContext.value.state}
        className="w-[30rem] data-[state=true]:opacity-100 data-[state=true]:translate-y-0 h-fit bg-white flex rounded-md shadow-md opacity-0 -translate-y-10 duration-200"
      >
        <div className="h-full w-[10rem] flex flex-col py-3 pl-3 gap-y-2">
          <div className="w-full flex flex-col py-2">
            <p className="text-sm font-montserrat-regular">Total payment:</p>
            <p className="text-3xl font-montserrat-bold">
              P{paymentContext.value.total}
            </p>
          </div>
          <div className="text-xs w-full border-b border-b-slate-300 pb-1">
            Payment method:
          </div>
          {buttons.map((btn) => (
            <div
              onClick={() => {
                setButtons((curr) => {
                  return curr.map((data) => {
                    if (btn.key === data.key) {
                      return { ...data, selected: true };
                    }
                    return { ...data, selected: false };
                  });
                });
                setElement(btn.element);
              }}
              data-selected={btn.selected}
              className="w-full data-[selected=true]:bg-main data-[selected=true]:text-white select-none cursor-pointer py-3 rounded-md px-3 text-sm bg-slate-100 border border-slate-300 font-montserrat-bold flex justify-between items-center"
              key={btn.key}
            >
              <span>{btn.label}</span>
              <BiChevronRight
                data-selected={btn.selected}
                className="w-5 data-[selected=true]:text-white h-5 text-slate-700"
              />
            </div>
          ))}
        </div>
        {element}
      </div>
    </div>
  );
}

export default PaymentPopup;
