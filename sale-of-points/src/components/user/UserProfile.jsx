import { useParams } from "react-router-dom";
import api from "../../http-common";
import { useState, useEffect } from "react";
import { Col, Container, Image, Row, Form, Button } from "react-bootstrap";
import EmailIcon from "@mui/icons-material/Email";
import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ErrorSnackbars from "../nofity/ErrorNotification";

const imageBaseUrl = process.env.REACT_APP_DYNAMIC_BASE_URL;
const UserProfile = () => {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [userTransactions, setUserTransactions] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // snack bar message
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        handleOpenSnackbar();
        setMsg(error.response.data.msg);
      }
    };
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/users/getUserSale/${userId}`);
        setUserTransactions(response.data);
      } catch (error) {
        console.error("Error fetching Transaction details", error);
      }
    };

    fetchUser();
    fetchTransactions();
  }, [userId, updateTrigger]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  const handleUpdateUser = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    if(fullName!==""){
      formData.append("fullName", fullName);
    }
    if(newPassWord!==""){
      formData.append("newPassword", newPassWord);
    }

    try {
      const response = await api.put(`/users/updateUser/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setUpdateTrigger((prev) => !prev);
      // Handle successful update (e.g., show a message, update local state)
    } catch (error) {
      console.error("Error updating user profile", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      {user && userTransactions ? (
        <Container>
          <Row>
            <Col>
              <Image
                className="mb-3"
                style={{ height: 250 }}
                src={`${imageBaseUrl}users/${user.id}/${user.profilePicturePath}`}
                roundedCircle
              />
              <h2>
                {user.fullName
                  ? user.fullName
                  : "Your Full is not created please provide in below"}
              </h2>
              <p>
                <EmailIcon /> {user.email}
              </p>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Change User Profile Image Here</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <div className="mb-3">
                <TextField
                  id="outlined-basic"
                  onChange={(e) => setFullName(e.target.value)}
                  label="Change Your Full Name"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mb-3">
                <TextField
                  id="outlined-password-input"
                  label="Update Your Password Here"
                  type="password"
                  onChange={(e) => setNewPassWord(e.target.value)}
                  autoComplete="current-password"
                  fullWidth
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                onClick={handleUpdateUser}
              >
                Update User
              </Button>
            </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}{" "}
                {/* Image preview */}
              </Form.Group>
              <h3>Your Sale KPI</h3>
              {userTransactions ? (
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Customer Give</TableCell>
                        <TableCell align="right">Customer Receive</TableCell>
                        <TableCell align="right">Payment Method</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Transaction Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log(userTransactions)}
                      {userTransactions.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="right">
                            {row.amount.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {row.customerGive}
                          </TableCell>
                          <TableCell align="right">
                            {row.customerReceive}
                          </TableCell>
                          <TableCell align="right">
                            {row.paymentMethod}
                          </TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell align="right">
                            {new Date(row.transactionDate).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <ErrorSnackbars
            message={msg}
            open={snackbarOpen}
            handleClose={handleCloseSnackbar}
          />
        </Container>
      ) : (
        <>
          {" "}
          <ErrorSnackbars
            message={msg}
            open={snackbarOpen}
            handleClose={handleCloseSnackbar}
          />
        </>
      )}
    </>
  );
};
export default UserProfile;
