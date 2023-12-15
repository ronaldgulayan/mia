import React from "react";
import { FaPlaneCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Unavailable() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center gap-y-5 flex-col">
      <FaPlaneCircleXmark className="w-32 h-32 text-main" />
      <p className="text-2xl font-montserrat-bold">No available flight found</p>
      <Button onClick={() => navigate("/")} color="blue" content="Back" />
    </div>
  );
}

export default Unavailable;
