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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Customers() {

    const [customers,setCustomers] = React.useState([])

    const fetchUser = async () => {
        try{
            const response = await api.get("customers");
            setCustomers(response.data)
        }catch(e){
            console.log(e)
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
    </Container>
  );
}
