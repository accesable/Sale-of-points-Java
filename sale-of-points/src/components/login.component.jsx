import React, { useEffect } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import ErrorSnackbars from "./nofity/ErrorNotification";
import {Container, Row, Col } from "react-bootstrap";
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
      const response = await api.get(
        `auth/confirm?token=${token}`,
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

  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "auth/signin",
        {
          username,
          password,
        }
      );
      const { accessToken, roles, email, id: userId,firstLogin } = response.data;
      if (accessToken) {
        // Save the JWT token
        localStorage.setItem("token", accessToken);
        localStorage.setItem("roles", roles);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", username);
        localStorage.setItem("isFirstLogin",firstLogin)
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

  const handleChangePasswordOnFirstLoginRequest = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "") {
      console.log("Empty Password");
      return;
    }
    try {
      console.log(newPassword);
      console.log(token);
      const response = await api.post(
        "auth/changePasswordOnFirstLogin",
        {
          updatedPassword: newPassword,
          token: token,
        }
      );
      const { accessToken, roles, email, id: userId, firstLogin } = response.data;
      if (accessToken) {
        // Save the JWT token
        localStorage.setItem("token", accessToken);
        localStorage.setItem("roles", roles);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", username);
        localStorage.setItem("isFirstLogin",firstLogin)
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
        </MDBContainer>
      )}
    </>
  );
}

export default LoginPage;
