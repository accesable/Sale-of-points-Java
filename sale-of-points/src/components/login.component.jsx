import React, { useEffect } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import ErrorSnackbars from "./nofity/ErrorNotification";
import Input from "@mui/joy/Input";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import api from "../http-common";
import { TextField, Button } from "@mui/material";

function LoginPage({ onLogin }) {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [token, setToken] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/auth/firstLogin")) {
      const queryParams = new URLSearchParams(location.search);
      if (queryParams.get("logintoken")) {
        setToken(queryParams.get("logintoken"));
        sendConfirmAndChangePasswordRequest(queryParams.get("logintoken"));
      }
    }
  }, []);

  const sendConfirmAndChangePasswordRequest = async (token) => {
    console.log("Token Sented =", token);
    try {
      const response = await axios.get(
        `http://localhost:8085/api/auth/confirm?token=${token}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setIsFirstLogin(true);
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data.msg);
        handleOpenSnackbar();
      } else {
        console.error("Error with no response body");
      }
    }
  };

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
      const { accessToken, roles, email, id: userId } = response.data;
      if (accessToken) {
        // Save the JWT token
        localStorage.setItem("token", accessToken);
        localStorage.setItem("roles", roles);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", username);
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

  const handleChangePasswordOnFirstLoginRequest = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "") {
      console.log("Empty Password");
      return;
    }
    try {
      console.log(newPassword);
      console.log(token);
      const response = await axios.post(
        "http://localhost:8085/api/auth/changePasswordOnFirstLogin",
        {
          updatedPassword: newPassword,
          token: token,
        }
      );
      const { accessToken, roles, email, id: userId } = response.data;
      if (accessToken) {
        // Save the JWT token
        localStorage.setItem("token", accessToken);
        localStorage.setItem("roles", roles);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", username);
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
      } else {
        console.error("Error with no response body");
      }
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <>
      {isFirstLogin ? (
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <h3>
                You are required to change password for futher functionality
                access
              </h3>
              <TextField
                className="my-3"
                fullWidth
                id="outlined-password-input"
                label="Your New Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                color="primary"
                onClick={handleChangePasswordOnFirstLoginRequest}
                variant="contained"
              >
                Confirm New Password
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      ) : (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
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
          <button type="button" class="btn btn-primary" onClick={handleLogin}>
            Sign in
          </button>
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
              <Button
                variant="secondary"
                onClick={handleCloseChangePasswordModal}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleChangePasswordRequest}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </MDBContainer>
      )}
    </>
  );
}

export default LoginPage;
