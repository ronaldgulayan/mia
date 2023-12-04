import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingContext } from "../context/CustomContext";

function Loading({ label = "Loading..." }) {
  const loadingContext = useContext(LoadingContext);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
      open={loadingContext.value.state}
      onClick={() => {
        loadingContext.setValue((curr) => ({ ...curr, state: false }));
      }}
      className="flex flex-col justify-center gap-y-2"
    >
      <CircularProgress color="inherit" />
      <span>{loadingContext.value.label}</span>
    </Backdrop>
  );
}

export default Loading;
