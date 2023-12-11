import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import api from "../../http-common";
import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import InfoIcon from "@mui/icons-material/Info";
import Button from "react-bootstrap/Button";
import OrderDetailsModal from "./OrderDetailsModal";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import { Badge } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function ImgMediaCard() {
  const [lgShow, setLgShow] = useState(false);

  const [products, setProducts] = useState([]);

  const handleDeleteAllOrderDetails = () => {
    sessionStorage.removeItem("currentOrder"); // Remove from local storage
    setCurrentOrder([]); // Reset current order state
    setLgShow(false); // Close the modal
  };

  const [currentOrder, setCurrentOrder] = useState(() => {
    const savedOrder = sessionStorage.getItem("currentOrder");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  const [mergedOrderDetails, setMergedOrderDetails] = useState([]);

  const handleFabClick = () => {
    const orderDetailsWithProductInfo = currentOrder.map((orderItem) => {
      const product = products.find((p) => p.id === orderItem.id);
      return {
        ...orderItem,
        name: product?.name,
        imagePath: product?.imagePath,
        retailPrice: product?.retailPrice,
      };
    });

    setMergedOrderDetails(orderDetailsWithProductInfo);
    setCurrentOrder(orderDetailsWithProductInfo);
    setLgShow(true);
  };

  const handleAddToOrder = (productId) => {
    const quantityToAdd = productQuantities[productId] || 1;

    setCurrentOrder((prevOrder) => {
      const productIndex = prevOrder.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        // Product already in order, update the quantity
        const updatedOrder = [...prevOrder];
        updatedOrder[productIndex].quantity += quantityToAdd;
        return updatedOrder;
      } else {
        // Product not in order, add new item
        return [...prevOrder, { id: productId, quantity: quantityToAdd }];
      }
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  useEffect(() => {
    sessionStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    // Replace 'your-url' with the actual URL you are fetching data from
    fetchProducts();
    // localStorage.removeItem('currentOrder');
  }, [currentOrder]); // The empty array ensures the effect runs only once after initial render

  const [productQuantities, setProductQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleOrderModalQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove the item from the order if newQuantity = 0
      setCurrentOrder((prevOrder) =>
        prevOrder.filter((item) => item.id !== productId)
      );
      const orderDetailsWithProductInfo = currentOrder.map((orderItem) => {
        const product = products.find((p) => p.id === orderItem.id);
        return {
          ...orderItem,
          name: product?.name,
          imagePath: product?.imagePath,
          retailPrice: product?.retailPrice,
        };
      });
      setMergedOrderDetails(orderDetailsWithProductInfo);
    } else {
      setCurrentOrder((prevOrder) =>
        prevOrder.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <Container className="mt-3">
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={`http://localhost:8085/dynamic/products/${product.id}/${product.imagePath}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.categoryName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price : {product.retailPrice} $
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={(e) => handleAddToOrder(product.id)}
                >
                  Add to Order
                </Button>
                <NumberInput
                  aria-label="Quantity Input"
                  min={1}
                  max={99}
                  value={productQuantities[product.id]}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleFabClick}
          sx={{ position: "fixed", bottom: 100, right: 200 }}
        >
          <Badge badgeContent={currentOrder.length} color="secondary">
            <InfoIcon />
          </Badge>
        </Fab>
      </Grid>
      <OrderDetailsModal
        show={lgShow}
        onHide={() => setLgShow(false)}
        orderDetails={mergedOrderDetails}
        onDeleteAllOrderDetails={handleDeleteAllOrderDetails}
        onQuantityChange={handleOrderModalQuantityChange}
      />
    </Container>
  );
}
const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
