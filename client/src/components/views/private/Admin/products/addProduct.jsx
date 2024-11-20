import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import GoBackButton from "../../../../GoBackButton/GoBackButton";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [image, setImage] = useState(null); // State for image file
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the file input
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // FormData for sending multipart/form-data
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);
    if (image) {
      formData.append("image", image); // Append the image file
    }

    try {
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Product added successfully!");
      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImage(null); // Clear the image input
      console.log("response", response.data);
    } catch (error) {
      setErrorMessage("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <GoBackButton />
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        Add New Product
      </Typography>

      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={productData.stock}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <Typography
                sx={{
                  marginTop: 1,
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: "gray",
                }}
              >
                {image.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                padding: "12px",
                fontWeight: "bold",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {successMessage && (
        <Typography
          sx={{
            textAlign: "center",
            color: "green",
            marginTop: 3,
            fontWeight: "bold",
          }}
        >
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography
          sx={{
            textAlign: "center",
            color: "red",
            marginTop: 3,
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default AddProduct;
