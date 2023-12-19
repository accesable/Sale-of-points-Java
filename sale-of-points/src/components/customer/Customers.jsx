import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import api from "../../http-common";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorSnackbars from "../nofity/ErrorNotification";
import { useState } from "react";

const Customers = () => {

      // snack bar message
      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [msg, setMsg] = useState("");
      const handleOpenSnackbar = () => {
        setSnackbarOpen(true);
      };
    
      const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
      };

    const [customers,setCustomers] = React.useState([])

    const fetchUser = async () => {
        try{
            const response = await api.get("customers");
            setCustomers(response.data)
        }catch(e){
          console.error("Error fetching products", e.response.data);
          setMsg(e.response.data.msg);
          handleOpenSnackbar();
        }
    }

    React.useEffect(()=>{
        fetchUser();
    },[])
    
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Customer Address</TableCell>
              <TableCell align="right">Customer PhoneNumber</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right"><Button variant="contained" as={Link} to={`/customers/${row.id}`} color="primary">Details</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ErrorSnackbars
        message={msg}
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
}
export default Customers;