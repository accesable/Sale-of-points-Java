import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import api from "../../http-common";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    // Replace 'your-url' with the actual URL you are fetching data from
    fetchCategories();
  }, []); // The empty array ensures the effect runs only once after initial render

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitNewCategory();
    }
  };

  const submitNewCategory = async () => {
    if (!newCategory) {
      alert("Please enter a category name");
      return;
    }

    try {
      const response = await api.post("/categories", {
        categoryName: newCategory,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Category added successfully:", response.data);
        setNewCategory(""); // Reset the input field
        fetchCategories(); // Fetch the updated list of categories
      } else {
        console.error("Error adding category:", response.status);
      }
    } catch (error) {
      console.error("Error adding category", error);
    }
  };
  const handleInputChange = (event) => {
    setNewCategory(event.target.value);
  };
  const roles = localStorage.getItem("roles");

  return (
    <Container>
      <h1>All Categories</h1>
      <InputGroup className="mb-3">
        {roles === "ROLE_ADMIN" && (
          <>
            <InputGroup.Text id="inputGroup-sizing-default">
              Add New Categoy Here
            </InputGroup.Text>
            <Form.Control
              value={newCategory}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </>
        )}
      </InputGroup>
      <ListGroup variant="flush">
        {categories.map((item, index) => (
          <ListGroup.Item key={index}>{item.categoryName}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
export default ProductCategories;
