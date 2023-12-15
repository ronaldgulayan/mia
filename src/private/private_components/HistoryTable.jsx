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
import axios from "axios";
import { fixDate, getGlobalUrl } from "../../functions/methods";
import useCookies from "../../hooks/useCookies";
import { AccountInformationContext } from "../../context/CustomContext";
import { Flag } from "semantic-ui-react";

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

function createData(type, total, method, status, date, book_id) {
  return {
    type,
    total,
    method,
    status,
    date,
    book_id: book_id,
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
  if (lower === "done") {
    return (
      <div className="flex items-center justify-center gap-x-3">
        <span className="text-green-500">Done</span>
        {success}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-x-3">
      <span className="text-red-500">Cancelled</span>
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
          <p className="text-base">₱{row.total}</p>
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
            <RowDropDown book_id={row.book_id} type={row.type} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const RowDropDown = ({ book_id, type }) => {
  const [fromFlight, setFromFlight] = React.useState();
  const [toFlight, setToFlight] = React.useState();
  const [departReturn, setDepartReturn] = React.useState();

  React.useEffect(() => {
    const fetch = async () => {
      let url;
      if (type === "return") {
        url = "/mia/api/get-return-flight/" + book_id;
      } else {
        url = "/mia/api/get-oneway-flight/" + book_id;
      }
      const response = await axios.get(getGlobalUrl(url));
      const fromId = response.data.data.from;
      const toId = response.data.data.to;
      const fromFlight = await axios.get(
        getGlobalUrl("/mia/api/get-place-by-id/" + fromId)
      );
      const toFlight = await axios.get(
        getGlobalUrl("/mia/api/get-place-by-id/" + toId)
      );
      setDepartReturn({
        depart: response.data.data.departure,
        return: response.data.data.return,
      });
      setFromFlight(fromFlight.data.data);
      setToFlight(toFlight.data.data);
    };
    fetch();
  }, []);

  if (!fromFlight || !toFlight) {
    return <div className="py-5">Loading...</div>;
  }
  return (
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
          <TableRow>
            <TableCell style={tableDataStyle} component="th" scope="row">
              1
            </TableCell>
            <TableCell style={tableDataStyle} component="th" scope="row">
              {fromFlight.airport_name}{" "}
              <Flag name={fromFlight.code.toLowerCase()} />
            </TableCell>
            <TableCell style={tableDataStyle}>
              {toFlight.airport_name}{" "}
              <Flag name={toFlight.code.toLowerCase()} />
            </TableCell>
            <TableCell style={tableDataStyle} align="right">
              {departReturn.depart}
            </TableCell>
            <TableCell style={tableDataStyle} align="right">
              {departReturn.return ? departReturn.return : "None"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

const HistoryTable = () => {
  const [flights, setFlights] = React.useState([]);
  const accountContext = React.useContext(AccountInformationContext);

  React.useEffect(() => {
    const fetch = async () => {
      const id = accountContext.value.id;
      const response = await axios.get(
        getGlobalUrl(`/mia/api/get-history-flights/${id}`)
      );

      const newData = response.data.data.map((data) => {
        const tempDate = new Date(data.date);
        const date = fixDate(tempDate);
        let url;

        const temp = createData(
          data.type,
          data.total,
          data.payment_method.toUpperCase(),
          data.status,
          date,
          data.id
        );
        return temp;
      });
      setFlights(newData);
    };
    fetch();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={tableHeaderStyle}>Type</TableCell>
            <TableCell style={tableHeaderStyle} align="left">
              Total Payment
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
          {flights.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
      {flights.length === 0 && (
        <p className="w-full py-10 text-center">Empty</p>
      )}
    </TableContainer>
  );
};

export default HistoryTable;
