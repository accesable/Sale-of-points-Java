import React from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import ErrorSnackbars from "./nofity/SuccessNotification";
import Input from "@mui/joy/Input";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function LoginPage({ onLogin }) {
  const {token} = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleCloseChangePasswordModal = () =>
    setShowChangePasswordModal(false);
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);

  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangePasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8085/api/auth/changePasswordOnFirstLogin",
        {
          username: username,
          oldPassword: password,
          updatedPassword: newPassword,
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        // Accessing the response body sent by the server
        // console.error("Error response body:", error.response.data);
        setMsg(error.response.data.msg);
        handleOpenSnackbar();
      } else {
        console.error("Error with no response body");
      }
      // Handle login error (e.g., show an error message)
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8085/api/auth/signin",
        {
          username,
          password,
        }
      );
      const { accessToken,roles,email,id:userId } = response.data;
      if (accessToken) {
        // Save the JWT token
        localStorage.setItem("token", accessToken);
        localStorage.setItem("roles", roles);
        localStorage.setItem("userId",userId);
        localStorage.setItem("userEmail",email);
        localStorage.setItem("username",username);
        onLogin(true);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Accessing the response body sent by the server
        // console.error("Error response body:", error.response.data);
        setMsg(error.response.data.msg);
        handleOpenSnackbar();
        if (error.response.data.code === "2") {
          handleShowChangePasswordModal();
        }
      } else {
        console.error("Error with no response body");
      }
      // Handle login error (e.g., show an error message)
    }
  };

  const handleChangePasswordForNewUser = () => {};
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {console.log(token)}
      <MDBInput
        wrapperClass="mb-4"
        onChange={(e) => setUsername(e.target.value)}
        label="Email address"
        id="form1"
        type="text"
        required
      />
      <MDBInput
        wrapperClass="mb-4"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        id="form2"
        type="password"
        required
      />
      <button
        type="button"
        class="btn btn-primary"
        fullWidth
        onClick={handleLogin}
      >
        Sign in
      </button>

      {/* <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div> */}
      <ErrorSnackbars
        message={msg}
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
      />

      <Modal
        show={showChangePasswordModal}
        onHide={handleCloseChangePasswordModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password On First Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="password"
            placeholder="Type in here…"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChangePasswordModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePasswordRequest}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </MDBContainer>
  );
}

export default LoginPage;
