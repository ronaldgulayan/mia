import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "@splidejs/react-splide/css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistratingPage from "./pages/RegistratingPage.jsx";
// import "@splidejs/react-splide/css/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/registration" element={<RegistratingPage />} />
    </Routes>
  </BrowserRouter>
);
