import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useCart } from "./../../../context/CartContext";
import { useUser } from "./../../../context/UserContext";
const ProductDetails = () => {
  const { id } = useParams();
  const { cartDispatch } = useCart();
  const { user } = useUser();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      console.log("Fetched product:", response.data);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product:", err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      // Dispatch to local context for UI update
      cartDispatch({
        type: "ADD_TO_CART",
        payload: {
          productId: product._id,
          name: product.name,
          quantity,
          price: product.price,
        },
      });

      // Send to the backend to save in the database
      const userId = user._id; // Replace with actual user ID from auth
      const response = await axios.post("/api/carts/add", {
        userId,
        productId: product._id,
        quantity,
      });

      console.log("Cart updated in the database:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value)); // Ensure at least 1
    setQuantity(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return product.length === 0 ? (
    <Box>
      <h1>No product yets </h1>
    </Box>
  ) : (
    <Box
      sx={{
        padding: 4,
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage: `url(${product.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              height: "400px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "1.1rem",
              marginBottom: 3,
            }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              marginBottom: 3,
            }}
          >
            ${product.price}
          </Typography>

          {/* Quantity Input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              size="small"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ maxWidth: 100 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent event handling
                handleAddToCart();
              }}
              sx={{ padding: "12px 24px", fontSize: "1rem" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Details or Call-to-Actions */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: 4,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Experience premium-quality products made with care and precision.
          Order now and elevate your space with our handcrafted goods.
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
