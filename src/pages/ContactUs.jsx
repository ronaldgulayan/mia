import React from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import MiniBanner from "../toolbox/MiniBanner";

function ContactUs() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <MiniBanner img="/banners/contact-us.gif" />
      <div className="w-full h-screen p-10 text-3xl">content</div>
      <Footer />
    </div>
  );
}

export default ContactUs;
