import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "@splidejs/react-splide/css";
import { BrowserRouter } from "react-router-dom";
// import "@splidejs/react-splide/css/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
