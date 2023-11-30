import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchingContext } from "../context/CustomContext";

function Loading({ label = "Loading..." }) {
  const searchingContext = useContext(SearchingContext);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
      open={searchingContext.value}
      onClick={() => searchingContext.setValue(false)}
      className="flex flex-col justify-center gap-y-2"
    >
      <CircularProgress color="inherit" />
      <span>{label}</span>
    </Backdrop>
  );
}

export default Loading;
