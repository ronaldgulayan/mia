import React from "react";
import Header from "./components/Header";
import CarouselPage from "./pages/CarouselPage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import GuidePage from "./pages/GuidePage";
import Footer from "./pages/Footer";
import SigninPopup from "./components/SigninPopup";
import ContextWrapper from "./context/ContextWrapper";
import { Route, Routes } from "react-router-dom";
import RegistratingPage from "./pages/RegistratingPage";

function App() {
  return (
    <ContextWrapper>
      <SigninPopup />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="relative bg-light min-h-screen w-full flex flex-col">
                <Header />
                <CarouselPage />
                <BookingPage />
                <ServicesPage />
                <GuidePage />
                <Footer />
              </div>
            </>
          }
        />
        <Route path="/registration" element={<RegistratingPage />} />
      </Routes>
    </ContextWrapper>
  );
}

export default App;
