import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

const tableHeaderStyle = {
  fontFamily: "Montserrat-bold",
  fontSize: 15,
};

const tableDataStyle = {
  fontFamily: "Montserrat-regular",
  fontSize: 13,
  paddingTop: 10,
  paddingBottom: 10,
};

function createData(type, paid, method, status, date, flights) {
  return {
    type,
    paid,
    method,
    status,
    date,
    flights: flights,
  };
}

const methodToElement = (payment_method) => {
  const lower = payment_method.toLowerCase();
  if (lower == "gcash") {
    return (
      <div className="flex items-center justify-center gap-x-3">
        <span className="w-fit">{payment_method}</span>
        <img className="w-6 h-6" src="/icons/gcash.png" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-x-3">
      <span className="w-fit">{payment_method}</span>
      <img className="w-6 h-6" src="/icons/paymaya.png" />
    </div>
  );
};

const statusToIcon = (status) => {
  const lower = status.toLowerCase();
  const success = <IoIosCheckmarkCircle className="w-6 h-6 text-green-500" />;
  const cancelled = (
    <img
      className="w-6 h-6 select-none"
      draggable="false"
      src="/icons/cancelled.png"
    />
  );
  if (lower === "success") {
    return (
      <div className="flex items-center justify-center gap-x-3">
        <span className="text-green-500">{status}</span>
        {success}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-x-3">
      <span className="text-red-500">{status}</span>
      {cancelled}
    </div>
  );
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <span>
                <HiChevronUp className="w-6 h-6" />
              </span>
            ) : (
              <span>
                <HiChevronDown className="w-6 h-6" />
              </span>
            )}
          </IconButton>
        </TableCell>
        <TableCell style={tableDataStyle} align="left">
          {row.type}
        </TableCell>
        <TableCell align="left">
          {row.paid ? (
            <IoIosCheckmarkCircle className="w-7 h-7 text-green-500" />
          ) : (
            <IoMdCloseCircle className="w-7 h-7 text-red-500" />
          )}
        </TableCell>
        <TableCell style={tableDataStyle} align="center">
          {methodToElement(row.method)}
        </TableCell>
        <TableCell style={tableDataStyle} align="center">
          {statusToIcon(row.status)}
        </TableCell>
        <TableCell style={tableDataStyle} align="right">
          {row.date}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                style={{
                  fontFamily: "Montserrat-black",
                  fontSize: 20,
                }}
                variant="h6"
                gutterBottom
                component="div"
              >
                Flight
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={tableHeaderStyle}>Flight</TableCell>
                    <TableCell style={tableHeaderStyle}>From</TableCell>
                    <TableCell style={tableHeaderStyle}>To</TableCell>
                    <TableCell style={tableHeaderStyle} align="right">
                      Departure
                    </TableCell>
                    <TableCell style={tableHeaderStyle} align="right">
                      Return
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.flights.map((historyRow, i) => (
                    <TableRow key={i}>
                      <TableCell
                        style={tableDataStyle}
                        component="th"
                        scope="row"
                      >
                        {historyRow.flight}
                      </TableCell>
                      <TableCell
                        style={tableDataStyle}
                        component="th"
                        scope="row"
                      >
                        {historyRow.from}
                      </TableCell>
                      <TableCell style={tableDataStyle}>
                        {historyRow.to}
                      </TableCell>
                      <TableCell style={tableDataStyle} align="right">
                        {historyRow.departure}
                      </TableCell>
                      <TableCell style={tableDataStyle} align="right">
                        {historyRow.return ? historyRow.return : "None"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Multi City", true, "Paymaya", "Success", "July 12, 2023", [
    {
      flight: 1,
      from: "Cavite",
      to: "Naic",
      departure: "July 12, 2002",
      return: "",
    },
    {
      flight: 2,
      from: "Cavite",
      to: "Naic",
      departure: "July 12, 2002",
      return: "",
    },
  ]),
  createData("Return", false, "GCash", "Cancelled", "July 12, 2023", [
    {
      flight: 1,
      from: "Cavite",
      to: "Naic",
      departure: "July 12, 2002",
      return: "",
    },
  ]),
  createData("Return", false, "GCash", "Cancelled", "July 12, 2023", [
    {
      flight: 1,
      from: "Cavite",
      to: "Naic",
      departure: "July 12, 2002",
      return: "",
    },
  ]),
  createData("Return", true, "Paymaya", "Success", "July 12, 2023", [
    {
      flight: 1,
      from: "Cavite",
      to: "Naic",
      departure: "July 12, 2002",
      return: "",
    },
  ]),
  createData("Return", false, "GCash", "Cancelled", "July 12, 2023", [
    {
      flight: 1,
      from: "Cavite",
      to: "Naic",
      departure: "July 12, 2002",
      return: "",
    },
  ]),
];

export default function HistoryTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={tableHeaderStyle}>Type</TableCell>
            <TableCell style={tableHeaderStyle} align="left">
              Paid
            </TableCell>
            <TableCell style={tableHeaderStyle} align="center">
              Payment Method
            </TableCell>
            <TableCell style={tableHeaderStyle} align="center">
              Status
            </TableCell>
            <TableCell style={tableHeaderStyle} align="right">
              Booking date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
