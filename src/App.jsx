import React, { useState } from "react";
import Header from "./components/Header";
import { FlightTypeContext } from "./context/CustomContext";
import CarouselPage from "./pages/CarouselPage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import GuidePage from "./pages/GuidePage";
import Footer from "./pages/Footer";
import SigninPopup from "./components/SigninPopup";

function App() {
  const [flightType, setFlightType] = useState("return");

  return (
    <FlightTypeContext.Provider
      value={{ value: flightType, setValue: setFlightType }}
    >
      <SigninPopup />
      <div className="relative bg-light min-h-screen w-full flex flex-col">
        <Header />
        <CarouselPage />
        <BookingPage />
        <ServicesPage />
        <GuidePage />
        <Footer />
      </div>
    </FlightTypeContext.Provider>
  );
}

export default App;
