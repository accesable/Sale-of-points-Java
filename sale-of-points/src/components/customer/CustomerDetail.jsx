import api from "../../http-common";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container } from "react-bootstrap";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [orderDetail,setOrderDetail] = useState(null);

  const handleTransactionDetails = async () =>{
    setOpen(!open)
    if (!open && !orderDetail) {
        try {
          // Replace '/order-details/' with your actual API endpoint
          const response = await api.get(`/order-details/find?orderId=${row.orderId}`);
          setOrderDetail(response.data);
        } catch (error) {
          console.error("Error fetching order details", error);
        }
      }
  }

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
                History
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
                  {orderDetail && orderDetail.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell component="th" scope="row">
                        {detail.id}
                      </TableCell>
                      <TableCell>{detail.product.name}</TableCell>
                      <TableCell align="right">{detail.product.importedPrice}</TableCell>
                      <TableCell align="right">
                        {detail.quantity}
                      </TableCell>
                      <TableCell align="right">
                        {detail.price}
                      </TableCell>
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

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/customers/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [customerId]);


  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >Transaction</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Customer Give</TableCell>
              <TableCell align="right">Customer Receive</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Transaction Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer && customer.transactionDTOS.map((row) => (
            <Row key={row.name} row={row} />
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomerDetail;
