import api from "../../http-common";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import ErrorSnackbars from "../nofity/ErrorNotification";
import SuccessSnackbars from "../nofity/SuccessNotification";

function Row(props) {
  const { row, onLockUser, onUnlockUser, onShowUserDetail, onResendToken } =
    props;
  const [open, setOpen] = React.useState(false);

  const handleUserDetails = async () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleUserDetails}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.username}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.fullName}</TableCell>
        <TableCell>{row.locked ? `Locked` : `Not Locked`}</TableCell>
        <TableCell align="right">
          {row.enabled ? `Enabled` : `Not Enabled`}
        </TableCell>
        <TableCell align="right">
          {row.roles.map((role) => (
            <span key={role.id}>{role.name}</span> // Or any other appropriate element
          ))}
        </TableCell>
        <TableCell align="right">
          {row.lastLogin
            ? new Date(row.lastLogin).toLocaleString()
            : "Not Logined"}
        </TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.enabled ? (
                <></>
              ) : (
                <Button
                  variant="contained"
                  style={{ marginLeft: 10 }}
                  color="primary"
                  onClick={() => onResendToken(row.id, row.email)}
                >
                  Resend Token to this User
                </Button>
              )}
              {row.locked ? (
                <Button
                  variant="contained"
                  style={{ marginLeft: 10 }}
                  color="success"
                  onClick={() => onUnlockUser(row.id)}
                >
                  Unlock This User
                </Button>
              ) : (
                <Button
                  onClick={() => onLockUser(row.id)}
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  color="error"
                >
                  lock This User
                </Button>
              )}
              <Button
                onClick={() => onShowUserDetail(row.id)}
                style={{ marginLeft: 10 }}
                variant="contained"
                color="secondary"
              >
                View Employee Information
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const UserDetail = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserFullName, setNewUserFullName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const handleCloseAddUserModal = () => setShowAddUserModal(false);
  const handleShowAddUserModal = () => setShowAddUserModal(true);

  // snack bar message
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // snack bar message
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const handleOpenErrorSnackbar = () => {
    setErrorSnackbarOpen(true);
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  const handleAddUser = () => {
    handleShowAddUserModal();
  };

  const [users, setUsers] = useState(null);

  const handleLockUserRequest = async (userId) => {
    try {
      await api.post(`users/lockUser/${userId}`);
      // Update the local state to reflect the lock change
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, locked: true } : user
        )
      );
    } catch (error) {
      console.error("Error locking user", error);
    }
  };

  const handleUnlockUserRequest = async (userId) => {
    try {
      await api.post(`users/unlockUser/${userId}`);
      // Update the local state to reflect the unlock change
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, locked: false } : user
        )
      );
    } catch (error) {
      console.error("Error unlocking user", error);
    }
  };
  const handleResendTokenUserRequest = async (userId, email) => {
    try {
      const data = { email: email };
      const response = await api.post(`auth/resendToken`, data);
      // Update the local state to reflect the unlock change
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, enabled: true } : user
        )
      );
      handleOpenSnackbar();
      setMsg(response.data.msg);
    } catch (error) {
      console.error("Error Resend Token", error);
      handleOpenErrorSnackbar();
      setMsg("Error Resend Token");
    }
  };
  const nagivate = useNavigate();
  const handleUserDetail = (userId) => {
    nagivate(`/users/${userId}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchUsers();
  }, []);
  const handleSendSignUpUserRequest = async () => {
    try {
      const data = { email: newUserEmail, fullName: newUserFullName };
      const response = await api.post(`auth/signup`, data);
      handleOpenSnackbar();
      setMsg(response.data.msg);
    } catch (error) {
      console.error("Sign up Request Error : ", error);
      handleOpenErrorSnackbar();
      setMsg("Sign up Request Error");
    }
  };

  return (
    <Container>
      {console.log(users)}
      {users ? (
        <>
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            color="primary"
            className="my-3"
            onClick={handleAddUser}
          >
            Add Another User
          </Button>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>#User ID</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">User Full Name</TableCell>
                  <TableCell align="right">User Locked Status</TableCell>
                  <TableCell align="right">User Enable Status</TableCell>
                  <TableCell align="right">User Roles</TableCell>
                  <TableCell align="right">Last Login</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((row) => (
                    <Row
                      key={row.id}
                      row={row}
                      onLockUser={handleLockUserRequest}
                      onUnlockUser={handleUnlockUserRequest}
                      onShowUserDetail={handleUserDetail}
                      onResendToken={handleResendTokenUserRequest}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <></>
      )}
      <Modal show={showAddUserModal} onHide={handleCloseAddUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            onChange={(e) => setNewUserFullName(e.target.value)}
            fullWidth
            id="filled-basic"
            label="Employee Full Name"
            variant="filled"
            style={{ marginBottom: 20 }}
          />
          <TextField
            type="email"
            onChange={(e) => setNewUserEmail(e.target.value)}
            fullWidth
            id="filled-basic"
            label="Employee Email"
            variant="filled"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="mx-2"
            color="secondary"
            onClick={handleCloseAddUserModal}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendSignUpUserRequest}
          >
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
      <SuccessSnackbars
        message={msg}
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
      />
      <ErrorSnackbars
        message={msg}
        open={errorSnackbarOpen}
        handleClose={handleCloseErrorSnackbar}
      />
    </Container>
  );
};

export default UserDetail;
