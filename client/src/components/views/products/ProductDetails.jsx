import { useState, useEffect } from "react";
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
import { useCart } from "../../../context/CartContext";
import { useUser } from "../../../context/UserContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { cartDispatch, fetchCart } = useCart(); // Use fetchCart to refresh cart state
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }

      // Update the backend cart
      await axios.post("/api/carts/add", {
        userId: user._id,
        productId: product._id,
        quantity,
      });

      // Update the local cart context
      cartDispatch({
        type: "ADD_TO_CART",
        payload: {
          productId: product._id,
          name: product.name,
          quantity,
          price: product.price,
        },
      });

      // Fetch the updated cart from the backend to ensure consistency
      await fetchCart(user._id);

      console.log("Product added to cart and cart updated.");
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

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h5" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
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
              backgroundImage: `url(${
                product ? product.imageUrl || product.thumbnail : null
              })`,
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
              disabled={!user}
              onClick={handleAddToCart}
              sx={{ padding: "12px 24px", fontSize: "1rem" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
