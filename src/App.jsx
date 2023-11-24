import React, { useState } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Booking from "./pages/Booking";
import FlightTypeContext from "./context/CustomContext";

function App() {
  const [flightType, setFlightType] = useState("return");

  return (
    <FlightTypeContext.Provider
      value={{ value: flightType, setValue: setFlightType }}
    >
      <div className="relative bg-light min-h-screen w-full flex flex-col">
        <Header />
        <Carousel />
        <Booking />
        <div className="h-96 w-full bg-red-500"></div>
      </div>
    </FlightTypeContext.Provider>
  );
}

export default App;
