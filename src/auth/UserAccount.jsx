import React from "react";
import Header from "../components/Header";
import Footer from "../pages/Footer";

function UserAccount() {
  return (
    <div className="w-full min-h-[100dvh] bg-light">
      <Header />
      <div className="w-full h-[50vh]">here na ako sa auth</div>
      <Footer />
    </div>
  );
}

export default UserAccount;
