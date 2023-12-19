import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { BarChart } from "@mui/x-charts/BarChart";
import api from "../../http-common";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  Table,
  TableBody,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { DateRangePicker } from "rsuite";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function ItemRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [orderDetail, setOrderDetail] = useState(null);

  const handleTransactionDetails = async () => {
    setOpen(!open);
    if (!open && !orderDetail) {
      try {
        // Replace '/order-details/' with your actual API endpoint
        const response = await api.get(
          `/order-details/find?orderId=${row.orderId}`
        );
        setOrderDetail(response.data);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleTransactionDetails}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
        <TableCell align="right">{row.customerGive}</TableCell>
        <TableCell align="right">{row.customerReceive}</TableCell>
        <TableCell align="right">{row.paymentMethod}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">
          {new Date(row.transactionDate).toLocaleString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Single Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                    <TableCell align="right">Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail &&
                    orderDetail.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell component="th" scope="row">
                          {detail.id}
                        </TableCell>
                        <TableCell>{detail.product.name}</TableCell>
                        <TableCell align="right">
                          {detail.product.retailPrice}
                        </TableCell>
                        <TableCell align="right">{detail.quantity}</TableCell>
                        <TableCell align="right">{detail.price}</TableCell>
                        <TableCell align="right">
                          {detail.product.categoryName}
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

const DashBoard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [quarter, setQuater] = useState("");

  // TimeLine Handler
  const [selectedTimeline, setSelectedTimeline] = useState("date");

  const handleTimelineChange = (event, newValue) => {
    const newTimeline = newValue;
    setSelectedTimeline(newTimeline);
    updateDateRange(newTimeline);
  };

  const handleQuarterChange = (event, newValue) => {
    const newQuarter = newValue;
    setQuater(newQuarter);
  };

  useEffect(() => {
    const today = new Date();
    let fromDate, toDate;
    switch (quarter) {
      case "1": // First Quarter (January - March)
        fromDate = new Date(today.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        toDate = new Date(today.getFullYear(), 3, 0)
          .toISOString()
          .split("T")[0];
        break;
      case "2": // Second Quarter (April - June)
        fromDate = new Date(today.getFullYear(), 3, 1)
          .toISOString()
          .split("T")[0];
        toDate = new Date(today.getFullYear(), 6, 0)
          .toISOString()
          .split("T")[0];
        break;
      case "3": // Third Quarter (July - September)
        fromDate = new Date(today.getFullYear(), 6, 1)
          .toISOString()
          .split("T")[0];
        toDate = new Date(today.getFullYear(), 9, 0)
          .toISOString()
          .split("T")[0];
        break;
      case "4": // Fourth Quarter (October - December)
        fromDate = new Date(today.getFullYear(), 9, 1)
          .toISOString()
          .split("T")[0];
        toDate = new Date(today.getFullYear(), 12, 0)
          .toISOString()
          .split("T")[0];
        break;
      default:
        // Handle default case if needed
        break;
    }
    setFromDate(fromDate);
    setToDate(toDate);
  }, [quarter]);

  const updateDateRange = (timeline) => {
    const today = new Date();
    let fromDate, toDate;

    switch (timeline) {
      case "date":
        fromDate = toDate = today.toISOString().split("T")[0];
        break;
      case "year":
        fromDate = new Date(today.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        toDate = new Date(today.getFullYear(), 11, 31)
          .toISOString()
          .split("T")[0];
        break;
      default:
        fromDate = toDate = today.toISOString().split("T")[0];
    }
    setFromDate(fromDate);
    setToDate(toDate);
  };

  //

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setToDate(today);
    setFromDate(today);
  }, []);

  useEffect(() => {
    // Ensure both fromDate and toDate are set
    if (fromDate && toDate) {
      fetchReports();
    }
  }, [fromDate, toDate, selectedTimeline]); // Depend on fromDate and toDate

  const fetchReports = async () => {
    console.log(selectedTimeline, fromDate, toDate);
    const response = await api.get(
      `sales?from=${fromDate}&to=${toDate}&timeline=${selectedTimeline}`
    );
    try {
      console.log(response.data);
      setRevenue(response.data.totalRevenue);
      setOrders(response.data.totalOrders);
      setProducts(response.data.totalProducts);
      setTransactions(response.data.transactionDTOS);
    } catch (e) {
      console.log("Error ", e);
    }
  };
  const handleChangeDay = (range) => {
    if (range && range.length === 2) {
      const [startDate, endDate] = range;
      console.log("Start Date:", startDate.toISOString());
      console.log("End Date:", endDate.toISOString());

      setFromDate(startDate.toISOString().split("T")[0]);
      setToDate(endDate.toISOString().split("T")[0]);
      setSelectedTimeline("date");

      // Now you can use startDate and endDate as needed
      // For example, formatting them or setting state
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <DateRangePicker onChange={handleChangeDay} />
          <Select
            placeholder="Select timeline"
            name="timeline"
            required
            sx={{ maxWidth: 200 }}
            width={500}
            onChange={handleTimelineChange}
          >
            <Option value="date">Date</Option>
            <Option value="quarter">Quarter</Option>
            <Option value="year">Year</Option>
          </Select>
          {selectedTimeline === "quarter" ? (
            <>
              <Select
                placeholder="Select Quater"
                name="Quater"
                required
                sx={{ maxWidth: 200 }}
                width={500}
                onChange={handleQuarterChange}
              >
                <Option value="1">1st</Option>
                <Option value="2">2nd</Option>
                <Option value="3">3rd</Option>
                <Option value="4">4th</Option>
              </Select>
            </>
          ) : (
            <></>
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <h3>Revenue : {revenue.toFixed(2)}$</h3>
            <h4>{selectedTimeline}</h4>

            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Total Transactions/Orders:", "Products"],
                },
              ]}
              series={[{ data: [orders, products] }]}
              height={400}
            />
          </Grid>
          <Grid item xs={7}>
            <Item>
              <h3>Transactions/Orders</h3>
            </Item>
            <>
              {/* <Typography variant="h4" gutterBottom>
                Customer Name : <u>{customer.name}</u>
              </Typography>
              <Typography variant="h5" gutterBottom>
                Customer Address : <u>{customer.address}</u>
              </Typography> */}
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow >
                      <TableCell />
                      <TableCell>#Transaction ID</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Customer Give</TableCell>
                      <TableCell align="right">Customer Receive</TableCell>
                      <TableCell align="right">Payment Method</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Transaction Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions &&
                      transactions.map((row) => (
                        <ItemRow key={row.id} row={row} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default DashBoard;
