import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { TextField } from "@mui/material";

function NavBar({ onLogout }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const roles = localStorage.getItem("roles");
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout(); // This will update the state in the App component
    }
    navigate("/"); // Navigate to the login page
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/categories"}>
          POS AtoZ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">
              Products{" "}
            </Nav.Link>
            {roles === "ROLE_ADMIN" && (
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            {roles === "ROLE_ADMIN" && (
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/customers">
              Customers
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {localStorage.getItem("isFirstLogin") ? (
              <Nav.Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Change Your Password Here
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to={`/users/${localStorage.getItem("userId")}`}
              >
                Hello {localStorage.getItem("username")}
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/" onClick={handleLogoutClick}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Your new Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Typography>
        </Box>
      </Modal>
    </Navbar>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default NavBar;
