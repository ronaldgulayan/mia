import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * This is a popup that appears at the top of your page. It is placed within the parent element of your page.
 * @param {Object} Context - The context object for the AlertBox.
 *   It has two attributes (value, setValue):
 *   - value (object): This is an object with five attributes:
 *     - value.state (boolean): A variable that indicates whether the AlertBox should be shown or not.
 *     - value.title (string): The title of the AlertBox.
 *     - value.error (boolean): If true, the title and message will be displayed in red; otherwise, it will be normal.
 *     - value.message (string): The message in the AlertBox.
 *     - value.submitEventHandler - (function): This function will call if you click the "ok" button.
 *   - setValue (function): A function that can modify the value.
 * @param {String} type - This type has only three possible values ("ok", "okcancel", "input")
 * @param {boolean} closeWhenOkay - If true, It automatically close the popup when you submit the data or click ok button.
 * @param {Number} seconds - In seconds when the alert box will automatically close. Default = 0
 */

function AlertBox({
  Context,
  type = "input",
  closeWhenOkay = false,
  seconds = 0,
}) {
  const alertBoxContext = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const divRef = useRef();
  const buttonRef = useRef();
  let timeoutId;

  const _close = () => {
    alertBoxContext.setValue((current) => {
      return {
        ...current,
        state: false,
      };
    });
  };

  const submitEvent = (data) => {
    window.clearTimeout(timeoutId);
    if (data === "close") {
      _close();
      if (type === "okcancel" && alertBoxContext.value.submitEventHandler) {
        alertBoxContext.value.submitEventHandler("cancel");
        return;
      }
      if (type === "input") {
        setInputValue("");
        return;
      }
    }
    if (closeWhenOkay) {
      _close();
    }
    if (type === "okcancel" && alertBoxContext.value.submitEventHandler) {
      alertBoxContext.value.submitEventHandler("ok");
      return;
    }
    if (type === "input" && alertBoxContext.value.submitEventHandler) {
      alertBoxContext.value.submitEventHandler(inputValue);
      setInputValue("");
      return;
    }
  };

  useEffect(() => {
    if (alertBoxContext.value.state && seconds >= 1) {
      timeoutId = window.setTimeout(() => {
        _close();
      }, seconds * 1000);
    }
    const clickOutsideEvent = (e) => {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        alertBoxContext.value.state
      ) {
        window.clearTimeout(timeoutId);
        _close();
      }
    };

    if (alertBoxContext.value.state && buttonRef.current) {
      buttonRef.current.focus();
    }

    document.addEventListener("mousedown", clickOutsideEvent);
    return () => document.removeEventListener("mousedown", clickOutsideEvent);
  }, [alertBoxContext.value.state]);

  return (
    <div
      ref={divRef}
      data-show={alertBoxContext.value.state}
      onSubmit={submitEvent}
      className="w-[85%] data-[show=true]:opacity-100 data-[show=true]:pointer-events-auto data-[show=true]:top-5 duration-200 opacity-0 pointer-events-none sm:w-96 h-fit top-0 z-20 font-poppins bg-white rounded-md border border-slate-200 shadow-xl fixed left-1/2 -translate-x-1/2"
    >
      <header className="flex border-b border-b-slate-300 items-center justify-between py-3 px-4">
        <h1
          data-error={alertBoxContext.value.error}
          className="truncate max-w-[80%] data-[error=true]:text-red-500 text-slate-800 font-bold"
        >
          {alertBoxContext.value.title}
        </h1>
        <button
          onClick={() => submitEvent("close")}
          className="text-slate-400 hover:text-slate-700 duration-100 font-bold cursor-pointer"
        >
          &#10005;
        </button>
      </header>
      <div className="pt-4 pb-3 px-4 text-sm text-slate-600">
        {type === "input" ? (
          <div className="flex flex-col gap-y-1">
            <span>{alertBoxContext.value.message}</span>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitEvent("okay");
                }
              }}
              type="text"
              autoComplete="off"
              className="border px-3 py-2 w-full outline-none rounded-sm border-slate-500"
            />
          </div>
        ) : (
          alertBoxContext.value.message
        )}
      </div>
      <div className="flex justify-end px-4 pb-5 text-slate-600 text-sm gap-x-2">
        {type === "ok" ? (
          <button
            ref={buttonRef}
            onClick={() => submitEvent("close")}
            className="px-4 py-1 active:bg-[#333333] hover:bg-[#2a2a2a] duration-100 bg-[#333] text-white rounded-sm"
          >
            Okay
          </button>
        ) : (
          <button
            ref={buttonRef}
            onClick={() => submitEvent("okay")}
            className="px-4 py-1 active:bg-[#333333] hover:bg-[#2a2a2a] duration-100 bg-[#333] text-white rounded-sm"
          >
            Okay
          </button>
        )}
        {type !== "ok" && (
          <button
            onClick={() => submitEvent("close")}
            className="border duration-100 active:bg-slate-200 hover:bg-slate-100 border-slate-500 px-2 py-1 rounded-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

AlertBox.propTypes = {
  Context: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["ok", "okcancel", "input"]),
  closeWhenOkay: PropTypes.bool,
  seconds: PropTypes.number,
};

export default AlertBox;
