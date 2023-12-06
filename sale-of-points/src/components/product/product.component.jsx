import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import {
  PencilSquare,
  InfoSquare,
  Trash,
  PlusSquare,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import api from "../../http-common";
import { DataGrid } from '@mui/x-data-grid';

function MyTable() {
  const [showDelete, setDeleteShow] = useState(false);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  
  const deleteProductRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await api.delete(
        "/products/" + selectedDeleteProductId.id
      );
      console.log(response.data);
      fetchProducts();
      handleDeleteClose();
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  const [selectedDeleteProductId, setSelectedDeleteProductId] = useState(null);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(`/products/add`);
  };
  const handleInfoClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleEditClick = () => {
    // logic for edit click
  };

  const handleDeleteClick = (product) => {
    setSelectedDeleteProductId(product); // Set the selected product ID
    handleDeleteShow(); // Open the modal
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  const hasImportedPrice = products.some(product => product.importedPrice !== 0);

  useEffect(() => {
    // Replace 'your-url' with the actual URL you are fetching data from
    fetchProducts();
    
  }, []); // The empty array ensures the effect runs only once after initial render
  return (
    <Container>
      <h1>Product</h1>
      <Button variant="success" onClick={handleAddClick}>
        <PlusSquare size={20} />
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Product Name</th>
            <th>Category</th>
            {hasImportedPrice && <th scope="col">Imported Price</th>}
            <th scope="col">Retail Price</th>
            <th>Created At</th>
            {hasImportedPrice && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.categoryName}</td>
              {hasImportedPrice && <td>{`$${product.importedPrice}`}</td>}
              <td>{product.retailPrice}</td>
              <td>{new Date(product.creationDate).toLocaleString()}</td>
              {hasImportedPrice && <td>
                <Button variant="primary" onClick={() => handleInfoClick(product.id)}>
                  <InfoSquare size={16} />
                </Button>
                {/* <Button variant="info" onClick={handleEditClick}>
                  <PencilSquare size={16} />
                </Button> */}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(product)}
                >
                  <Trash size={16} />
                </Button>
              </td>}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDeleteProductId
            ? `Are you sure you want to delete the product with Name: ${selectedDeleteProductId.name} ?`
            : "Loading..."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteProductRequest}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MyTable;
