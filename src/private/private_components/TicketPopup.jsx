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

  useEffect(() => {
    if (ticketContext.value.state) {
      console.log(
        ticketContext.value.data.user_id +
          "-" +
          ticketContext.value.data.book_id
      );
    }
  }, [ticketContext.value.state]);

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
        className="-translate-y-14 opacity-0 duration-200 md:w-fit w-[95%] data-[state=true]:opacity-100 data-[state=true]:translate-y-0 rounded-lg h-fit flex justify-center bg-light flex-col md:p-7 p-4"
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
        <div className="flex flex-col w-full items-center">
          <div
            id="account-ticket"
            className="w-[21rem] h-fit overflow-hidden bg-white rounded-md shadow-md"
          >
            <div className="w-full h-10 bg-main px-2 flex items-center justify-between">
              <div className="flex h-full items-center gap-x-1 py-2">
                <img src="/logos/main-logo.png" className="h-full" />
                <p className="text-white text-sm font-bold">
                  Manila International Airport
                </p>
              </div>
            </div>
            <div className="flex h-full">
              <div className="w-full flex h-full flex-col p-2 gap-y-1">
                {ticketContext.value.data && ticketContext.value.state ? (
                  <>
                    <div className="flex items-center justify-between w-full gap-x-2">
                      <div className="flex items-center gap-x-3 w-[calc(100%-1.25rem)] relative">
                        <span className="">
                          <p className="text-xs font-bold">From</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.from}
                          </p>
                        </span>
                        <span>
                          <p className="text-xs font-bold">To</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.to}
                          </p>
                        </span>
                      </div>
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="w-full h-fit grid grid-cols-4">
                      <div className="flex flex-col gap-y-1">
                        <span>
                          <p className="text-xs font-bold">Name</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.fullName}
                          </p>
                        </span>
                        <span>
                          <p className="text-xs font-bold">User ID</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.user_id}
                          </p>
                        </span>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span>
                          <p className="font-bold text-xs">Class</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.class}
                          </p>
                        </span>
                        <span>
                          <p className="text-xs font-bold">Passengers</p>
                          <p className="text-[0.7rem]">
                            {(() => {
                              const passengers =
                                ticketContext.value.data.passengers;
                              return `${passengers[0]}-${passengers[1]}-${passengers[2]}-${passengers[3]}`;
                            })()}
                          </p>
                        </span>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span>
                          <p className="text-xs font-bold">Flag</p>
                          <p className="text-[0.7rem]">
                            <Flag
                              name={ticketContext.value.data.fromCode.toLowerCase()}
                            />
                            <Flag
                              name={ticketContext.value.data.toCode.toLowerCase()}
                            />
                          </p>
                        </span>
                        <span>
                          <p className="font-bold text-xs">Type</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.type}
                          </p>
                        </span>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span>
                          <p className="text-xs font-bold">Departure</p>
                          <p className="text-[0.7rem]">
                            {ticketContext.value.data.departure}
                          </p>
                        </span>
                        {ticketContext.value.data.return_ && (
                          <span>
                            <p className="text-xs font-bold">Return</p>
                            <p className="text-[0.7rem]">
                              {ticketContext.value.data.return_}
                            </p>
                          </span>
                        )}
                      </div>
                    </div>
                    <Barcode
                      displayValue={false}
                      fontSize={10}
                      margin={2}
                      textAlign="left"
                      height={20}
                      value={
                        ticketContext.value.data.user_id +
                        "-" +
                        ticketContext.value.data.book_id
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
