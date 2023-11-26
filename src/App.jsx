import React, { useState } from "react";
import Header from "./components/Header";
import FlightTypeContext from "./context/CustomContext";
import CarouselPage from "./pages/CarouselPage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
  const [flightType, setFlightType] = useState("return");

  return (
    <FlightTypeContext.Provider
      value={{ value: flightType, setValue: setFlightType }}
    >
      <div className="relative bg-light min-h-screen w-full flex flex-col">
        <Header />
        <CarouselPage />
        <BookingPage />
        <ServicesPage />
      </div>
    </FlightTypeContext.Provider>
  );
}

export default App;
