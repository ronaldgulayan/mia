import React, { useContext, useEffect, useState } from "react";
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
import ContactUs from "./pages/ContactUs";
import TopButton from "./toolbox/TopButton";
import AboutUsPage from "./pages/AboutUsPage";
import {
  AccountPopupContext,
  RegistrationAlertBoxContext,
} from "./context/CustomContext";
import Loading from "./pages/Loading";
import AlertBox from "./toolbox/AlertBox";
import Account from "./private/Account";
import ProfilePopup from "./components/ProfilePopup";
import Auth from "./auth/Auth";

function App() {
  return (
    <div>
      <ContextWrapper>
        <SigninPopup />
        {/* <TopButton /> */}
        <Loading label="Searching..." />
        <AlertBox Context={RegistrationAlertBoxContext} seconds={5} type="ok" />
        <AlertBox
          Context={AccountPopupContext}
          type="okcancel"
          seconds={5}
          closeWhenOkay
        />
        <Routes>
          <Route
            path="/"
            element={
              // MAIN PAGE
              <div className="relative bg-light min-h-screen w-full flex flex-col">
                <Header />
                <CarouselPage />
                <BookingPage />
                <ServicesPage />
                <GuidePage />
                <Footer />
              </div>
            }
          />
          <Route path="/registration" element={<RegistratingPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route element={<Auth />}>
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
        {/* </SearchingContext.Provider> */}
      </ContextWrapper>
    </div>
  );
}

export default App;
