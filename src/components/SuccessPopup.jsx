import React, { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { SuccessContext } from "../context/CustomContext";

function SuccessPopup() {
  const navigate = useNavigate();
  const successContext = useContext(SuccessContext);

  return (
    <div
      data-visible={successContext.value}
      className="w-full data-[visible=true]:flex h-screen z-[10] gap-y-5 text-green-500 bg-light fixed top-0 left-0 hidden flex-col items-center justify-center"
    >
      <FaCheckCircle className="h-20 w-20" />
      <p className="text-4xl">Booking success!</p>
      <Button
        onClick={() => {
          successContext.setValue(false);
          navigate("/");
        }}
        color="blue"
      >
        Back to homepage
      </Button>
    </div>
  );
}

export default SuccessPopup;
