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
import { useNavigate, useParams } from "react-router-dom";


const imageBaseUrl =process.env.REACT_APP_DYNAMIC_BASE_URL || "http://localhost:8085/dynamic/products/";
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
    if (name !== "") {
      formData.append("name", name);
    }
    if (importedPrice !== "") {
      formData.append("importedPrice", importedPrice);
    }
    if (retailPrice !== "") {
      formData.append("retailPrice", retailPrice);
    }
    if (imageFile !== null) {
      formData.append("imageFile", imageFile);
    }
    if (selectedCategoryId !== "") {
      formData.append("categoryId", selectedCategoryId);
    }
    try {
      await api.put("/products/" + productId, formData, {
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

  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        if (response.data.imagePath) {
          setImagePreview(
            `${imageBaseUrl}products/${productId}/${response.data.imagePath}`
          );
        }
      } catch (error) {
        console.error("Error fetching product details", error);
        navigate("NotFounded")
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h3>
            Update/Detail Product <u>{product.id}</u>
          </h3>
          <Form onSubmit={addProductSubmit}>
            <Form.Group className="mb-3">
              <TextField
                id="filled-basic"
                label="Product Name"
                variant="filled"
                defaultValue={product.name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Update Product Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={selectedCategoryId}
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
                  defaultValue={product.importedPrice}
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
                  defaultValue={product.retailPrice}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image Here</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
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
              <Toast.Body>Product Updated</Toast.Body>
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

export default ProductDetail;
