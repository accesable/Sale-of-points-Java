import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Toast from "react-bootstrap/Toast";
import api from "../../http-common";
function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [name, setName] = useState("");
  const [importedPrice, setImportedPrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

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

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const addProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("importedPrice", importedPrice);
    formData.append("retailPrice", retailPrice);
    formData.append("imageFile", imageFile);
    formData.append("categoryId", selectedCategoryId);

    try {
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toggleShowA();
    } catch (error) {
      console.error("Error adding product", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  useEffect(() => {
    // Replace 'your-url' with the actual URL you are fetching data from
    fetchCategories();
  }, []); // The empty array ensures the effect runs only once after initial render
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Form onSubmit={addProductSubmit}>
            <Form.Group className="mb-3">
              <TextField
                id="filled-basic"
                label="Product Name"
                variant="filled"
                defaultValue="Laptop"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Product Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCategoryId}
                  label="Product Category"
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Form.Group>
            <Form.Group className="mb-3">
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Imported Price
                </InputLabel>
                <FilledInput
                  onChange={(e) => setImportedPrice(e.target.value)}
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Form.Group>
            <Form.Group className="mb-3">
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Retail Price
                </InputLabel>
                <FilledInput
                  onChange={(e) => setRetailPrice(e.target.value)}
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image Here</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Product
            </Button>
            <Toast show={showA} onClose={toggleShowA} className="mt-2">
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Message</strong>
              </Toast.Header>
              <Toast.Body>Product Added</Toast.Body>
            </Toast>
          </Form>
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
        </Col>
      </Row>
    </Container>
  );
}

export default AddProductForm;
