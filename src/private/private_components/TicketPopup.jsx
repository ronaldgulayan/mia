import React, { useContext, useEffect } from "react";
import Barcode from "react-barcode";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaPlane, FaCheckCircle } from "react-icons/fa";
import { Button, Flag } from "semantic-ui-react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { TicketContext } from "../private_context/PrivateContext";
import axios from "axios";
import { getGlobalUrl } from "../../functions/methods";

function TicketPopup() {
  const ticketContext = useContext(TicketContext);

  const downloadEventHandler = () => {
    const ticketElement = document.getElementById("account-ticket");
    html2canvas(ticketElement).then((value) => {
      value.toBlob((blob) => {
        saveAs(blob, "ticket.png");
        window.alert("success");
        axios
          .put(
            getGlobalUrl(
              "/mia/api/set-done-flight/" + ticketContext.value.data.book_id
            )
          )
          .then((value) => {
            window.location.reload();
          });
      });
    });
  };

  return (
    <div
      data-state={ticketContext.value.state}
      className="w-full opacity-0 pointer-events-none data-[state=true]:opacity-100 data-[state=true]:pointer-events-auto duration-200 fixed z-[10] top-0 left-0 h-screen bg-[#0009] backdrop-blur-sm flex items-center justify-center"
    >
      <div
        data-state={ticketContext.value.state}
        className="-translate-y-14 opacity-0 duration-200 md:w-[50%] w-[95%] data-[state=true]:opacity-100 data-[state=true]:translate-y-0 rounded-lg h-fit flex justify-center bg-light flex-col md:p-7 p-4"
      >
        <div className="w-full flex justify-between items-center mb-4">
          <p className="text-xl font-montserrat-bold">Your ticket</p>
          <button
            onClick={() =>
              ticketContext.setValue((curr) => ({ ...curr, state: false }))
            }
            className="text-lg font-bold"
          >
            &#10005;
          </button>
        </div>
        <div
          id="account-ticket"
          className="w-full h-fit overflow-hidden bg-white rounded-md shadow-md"
        >
          <div className="w-full h-12 bg-main px-3 flex items-center justify-between">
            <div className="flex h-full items-center gap-x-3 py-1">
              <img src="/logos/main-logo.png" className="h-full" />
              <p className="text-white text-sm">Manila International Airport</p>
            </div>
            <p className="text-white">
              #{ticketContext.value.data ? ticketContext.value.data.book_id : 0}
            </p>
          </div>
          <div className="flex h-full">
            <div className="max-h-full flex items-center w-fit">
              <GiCommercialAirplane className="h-40 w-40 md:block hidden text-main p-5" />
            </div>
            <div className="md:w-[calc(100%-10rem)] pb-2 w-full flex flex-col px-3">
              {ticketContext.value.data && ticketContext.value.state ? (
                <>
                  <div className="flex items-center py-4 justify-between w-full">
                    <div className="flex items-center gap-x-3 w-fit relative">
                      <p className="text-lg leading-5">
                        {ticketContext.value.data.from}
                      </p>
                      <FaPlane className="min-w-[1rem] h-4 text-black" />
                      <p className="text-lg leading-5">
                        {ticketContext.value.data.to}
                      </p>
                    </div>
                    <FaCheckCircle className="w-5 min-w-[1.25rem] h-5 text-green-500" />
                  </div>
                  <div className="w-full flex gap-x-5 pb-2">
                    <div className="flex flex-col">
                      <div className="text-xs">
                        {ticketContext.value.data.fullName}
                      </div>
                      <p className="text-xs">
                        U-{ticketContext.value.data.user_id}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">
                        {ticketContext.value.data.class}
                      </p>
                      <p className="text-xs">
                        {(() => {
                          const passengers =
                            ticketContext.value.data.passengers;
                          return `${passengers[0]}-${passengers[1]}-${passengers[2]}-${passengers[3]}`;
                        })()}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">
                        <Flag
                          name={ticketContext.value.data.fromCode.toLowerCase()}
                        />
                        <Flag
                          name={ticketContext.value.data.toCode.toLowerCase()}
                        />
                      </p>
                      <p className="text-xs">{ticketContext.value.data.type}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">8AM-6PM</p>
                    </div>
                  </div>
                  <Barcode
                    displayValue={false}
                    fontSize={10}
                    margin={2}
                    textAlign="left"
                    height={25}
                    value={
                      ticketContext.value.data.fullName.split(" ")[0] +
                      ticketContext.value.data.user_id
                    }
                    background="#eeeeee"
                  />
                </>
              ) : (
                "None"
              )}
            </div>
          </div>
        </div>
        <div className="w-full justify-end flex py-5">
          <Button
            onClick={downloadEventHandler}
            color="green"
            content="Download Ticket"
            icon="download"
          />
        </div>
      </div>
    </div>
  );
}

export default TicketPopup;
