import React, { useState } from "react";
import Header from "./components/Header";
import { FlightTypeContext, SigninPopupContext } from "./context/CustomContext";
import CarouselPage from "./pages/CarouselPage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import GuidePage from "./pages/GuidePage";
import Footer from "./pages/Footer";
import SigninPopup from "./components/SigninPopup";

function App() {
  const [flightType, setFlightType] = useState("return");
  const [visibleSigninPopup, setVisibleSigninPopup] = useState(false);

  return (
    <FlightTypeContext.Provider
      value={{ value: flightType, setValue: setFlightType }}
    >
      <SigninPopupContext.Provider
        value={{
          value: visibleSigninPopup,
          setValue: setVisibleSigninPopup,
        }}
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
      </SigninPopupContext.Provider>
    </FlightTypeContext.Provider>
  );
}

export default App;
