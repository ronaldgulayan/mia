import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { getDate } from "./Tools";

function Calendar({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        minDate={dayjs(getDate())}
        value={value}
        onChange={(value) => setValue(dayjs(new Date(value)))}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
