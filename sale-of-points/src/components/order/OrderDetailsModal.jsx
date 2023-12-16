import { React, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBTypography,
  MDBCardImage,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";



const imageBaseUrl =process.env.REACT_APP_DYNAMIC_BASE_URL || "http://localhost:8085/dynamic/products/";
const OrderDetailsModal = ({
  show,
  onHide,
  orderDetails,
  onDeleteAllOrderDetails,
  onQuantityChange,
}) => {
  const handleDeleteOrderDetails = () => {
    onDeleteAllOrderDetails(); // Call the parent's callback
  };

  useEffect(()=>{

  },[orderDetails])
  const navigate = useNavigate();
  const handleConfirmOrder = () => {
    navigate("/checkout");
  };


  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" xl="8">
            <MDBCard style={{ borderRadius: "10px" }}>
              <MDBCardHeader className="px-4 py-5">
                <MDBTypography tag="h5" className="text-muted mb-0">
                  Preview Your Order
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p
                    className="lead fw-normal mb-0"
                    style={{ color: "#a8729a" }}
                  >
                    Receipt
                  </p>
                  <p className="small text-muted mb-0">
                    <Button variant="danger" onClick={handleDeleteOrderDetails}>
                      Delete All Details
                    </Button>
                  </p>
                </div>

                {orderDetails.map((item, index) => (
                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol md="2">
                          <MDBCardImage
                            src={`${imageBaseUrl}products/${item.id}/${item.imagePath}`}
                            fluid
                            alt="Phone"
                          />
                        </MDBCol>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0">{item.name}</p>
                        </MDBCol>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">
                            <TextField
                              id="outlined-number"
                              type="number"
                              defaultValue={item.quantity}
                              InputLabelProps={{
                                shrink: true,
                                max:99,
                                min:1,
                              }}
                              onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
                          
                            />
                            Quantity
                          </p>
                        </MDBCol>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">
                            Price per Products : ${item.retailPrice}
                          </p>
                        </MDBCol>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">
                            Total Price Products : $
                            {item.retailPrice * item.quantity}
                          </p>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </MDBCardBody>
              <MDBCardFooter
                className="border-0 px-4 py-5"
                style={{
                  backgroundColor: "#cccccc",
                }}
              >
                <MDBTypography
                  tag="h5"
                  className="d-flex align-items-center justify-content-end text-black text-uppercase mb-0"
                >
                  <Button variant="primary mt-3" onClick={handleConfirmOrder}>
                    Go To Checkout
                  </Button>
                </MDBTypography>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Modal>
  );
};

export default OrderDetailsModal;
