import React from "react";
import { Button } from "semantic-ui-react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

function Ticket() {
  const downloadEvent = () => {
    const ticketElement = document.getElementById("ticket");
    html2canvas(ticketElement)
      .then((value) => {
        value.toBlob((blob) => {
          saveAs(blob, "ticket.png");
          window.alert("success");
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="w-full h-screen bg-light flex items-center justify-center flex-col gap-y-5">
      <div id="ticket" className="w-[40rem] h-80 bg-red-500 hidden">
        my ticket
      </div>
      <Button onClick={downloadEvent} color="blue">
        download
      </Button>
    </div>
  );
}

export default Ticket;
