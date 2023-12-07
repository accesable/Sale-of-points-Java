import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import api from "../../http-common";
import debounce from "lodash.debounce";
import { Clear, Info } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const handleCoutinueOrder = () => {
    navigate("/orders");
  };
  const [orderDetails, setOrderDetail] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerFullName, setCustomerFullName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [selectedPayMethod, setSelectedPayMethod] = useState("");
  const [customerGive, setCustomerGive] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmitConfirmOrder = async (e) => {
    // Prepare the order detail list
    const orderDetailList = orderDetails.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    // Prepare the customer object
    const customer = {
      phoneNumber: customerPhoneNumber,
      name: customerFullName,
      address: customerAddress,
    };
    // Prepare the transaction object

    const transaction = {
      amount: totalPrice,
      paymentMethod: selectedPayMethod,
      customerGive: customerGive,
      customerReceive: (customerGive - totalPrice).toFixed(2),
      status: selectedPayMethod === "Cash" ? "Success" : "Pending",
    };
    const userId = localStorage.getItem("userId");
    // Prepare the complete order object
    const orderData = {
      orderDetailList,
      customer,
      transaction,
      userId
    };
    // API Request
    try {
      const response = await api.post("/orders/batch", orderData);
      console.log(response.data);
      toggleShowSuccess();
      // Handle successful response (e.g., navigate to a success page or display a success message)
    } catch (error) {
      if (error.response && error.response.data) {
        // Accessing the response body sent by the server
        console.error("Error response body:", error.response.data);
    } else {
        console.error("Error with no response body");
    }
      toggleShowError()
      // Handle errors (e.g., display an error message)
    }
  };
  const toggleShowSuccess = () => setShowSuccess(!showSuccess);
  const toggleShowError = () => setShowError(!showError);

  const payMethods = ["Cash", "Credit Card", "VnPay"];

  const handleClearCustomerInformation = () => {
    setSelectedCustomer(null);
  };

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("currentOrder");
    const orderDetails1 = savedOrder ? JSON.parse(savedOrder) : [];
    setOrderDetail(orderDetails1);

    // Use orderDetails here
  }, []);

  // Calculate the total price
  const totalPrice = orderDetails.reduce(
    (sum, item) => sum + item.retailPrice * item.quantity,
    0
  );

  const handleSelect = (event, value) => {
    // Find the selected customer from options
    const customer = options.find((option) => option.phoneNumber === value);
    setCustomerPhoneNumber(value);
    setSelectedCustomer(customer);
  };

  const fetchSuggestions = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    try {
      const response = await api.get(`/customers/find?phoneNumber=${value}`);
      setOptions(response.data); // Adjust mapping based on your API response
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (event, newInputValue) => {
    setCustomerPhoneNumber(newInputValue);
    debouncedFetchSuggestions(newInputValue);
  };
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a onClick={handleCoutinueOrder} className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                        Ordering
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {orderDetails.length} items in your cart
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="text-muted">Sort by:</span>
                          <a href="#!" className="text-body">
                            price
                            <MDBIcon fas icon="angle-down mt-1" />
                          </a>
                        </p>
                      </div>
                    </div>
                    {orderDetails.map((item, index) => (
                      <MDBCard className="mb-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <MDBCardImage
                                  src={`http://localhost:8085/dynamic/products/${item.id}/${item.imagePath}`}
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt="Shopping item"
                                />
                              </div>
                              <div className="ms-3">
                                <MDBTypography tag="h5">
                                  {item.name}
                                </MDBTypography>
                                <p className="small mb-0">
                                  Price per product : {item.retailPrice}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  {item.quantity}
                                </MDBTypography>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  ${item.quantity * item.retailPrice}
                                </MDBTypography>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <MDBIcon fas icon="trash-alt" />
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                  </MDBCol>
                  <MDBCol lg="5">
                    <MDBCard className="bg-light text-dark rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Customer Information
                          </MDBTypography>
                        </div>
                        <form className="mt-4">
                          <Autocomplete
                            freeSolo
                            id="autocomplete-demo"
                            className="mb-3"
                            disableClearable
                        
                            options={options.map(
                              (option) => option.phoneNumber
                            )}
                            onChange={handleSelect} // Handle selection
                            onInputChange={handleInputChange} // Trigger request on input change
                            filterOptions={(x) => x} // Disable built-in filtering
                            renderInput={(params) => (
                              <TextField
                              required
                                {...params}
                                label="Customer Phone Number"
                                InputProps={{
                                  ...params.InputProps,
                                  type: "search",
                                }}
                              />
                            )}
                          />
                          {selectedCustomer ? (
                            <div class="note note-primary mb-3 " bg="primary">
                              <Clear onClick={handleClearCustomerInformation} />
                              <ul className="list-unstyled">
                                <li
                                  key={selectedCustomer.name}
                                  className="mb-1"
                                >
                                  <strong>Cust Name : </strong>{" "}
                                  <u>{selectedCustomer.name}</u>
                                </li>
                                <li
                                  key={selectedCustomer.address}
                                  className="mb-1"
                                >
                                  <strong>Cust Address : </strong>{" "}
                                  <u>{selectedCustomer.address}</u>
                                </li>
                                <li key={selectedCustomer.id} className="mb-1">
                                  <a href={`/customers/${selectedCustomer.id}`}>
                                    <Info /> Check Customer Info
                                  </a>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <div className="mb-3">
                              <TextField
                                className="mb-3"
                                id="outlined-basic"
                                label="Customer's Full Name"
                                variant="outlined"
                                onChange={(e) =>
                                  setCustomerFullName(e.target.value)
                                }
                                fullWidth
                              />
                              <TextField
                                id="outlined-basic"
                                label="Customer's Address"
                                variant="outlined"
                                onChange={(e) =>
                                  setCustomerAddress(e.target.value)
                                }
                                fullWidth
                              />
                            </div>
                          )}
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            className="mb-3"
                            options={payMethods}
                            getOptionDisabled={(option) =>
                              option === payMethods[1] ||
                              option === payMethods[2]
                            }
                            onChange={(event, newValue) => {
                              setSelectedPayMethod(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Payment Method" />
                            )}
                          />
                          {selectedPayMethod === "Cash" && (
                            <MDBRow className="mb-4">
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="Customer Give"
                                  type="text"
                                  size="lg"
                                  placeholder="Customer Give"
                                  contrast
                                  onChange={(e) =>
                                    setCustomerGive(e.target.value)
                                  }
                                />
                              </MDBCol>
                              <MDBCol md="6">
                                <h5 class="display-6">
                                  Customer Receive :{" "}
                                  <strong>
                                    $
                                    {`${(customerGive - totalPrice).toFixed(
                                      2
                                    )}`}
                                  </strong>
                                </h5>
                                {/* {console.log(customerGive)}  
                          <MDBInput className="mb-4" label="Customer Receive" type="text" size="lg" 
                             placeholder={`${(customerGive-totalPrice).toFixed(2)}`} contrast /> */}
                              </MDBCol>
                            </MDBRow>
                          )}
                        </form>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total:</p>
                          <p className="mb-2">${totalPrice}</p>
                        </div>

                        <MDBBtn
                          color="success"
                          size="lg"
                          onClick={handleSubmitConfirmOrder}
                          disabled={orderDetails.length === 0 }
                        >
                          <div className="d-flex justify-content-between">
                            <span>
                              Confirm Order{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                        <Snackbar
                          open={showSuccess}
                          autoHideDuration={6000}
                          onClose={() => setShowSuccess(false)}
                        >
                          <Alert
                            onClose={() => setShowSuccess(false)}
                            severity="success"
                            sx={{ width: "100%" }}
                          >
                            Order Confirmed
                          </Alert>
                        </Snackbar>
                        <Snackbar
                          open={showError}
                          autoHideDuration={6000}
                          onClose={() => setShowError(false)}
                        >
                          <Alert
                            onClose={() => setShowError(false)}
                            severity="error"
                            sx={{ width: "100%" }}
                          >
                            Order Is Invalid 
                          </Alert>
                        </Snackbar>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});