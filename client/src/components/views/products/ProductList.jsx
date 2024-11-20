import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import productApi from "./../../../apis/productApi";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await productApi.getAll();
      console.log("Fetched products:", response.data);

      // Ensure the response is an array
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        throw new Error("API did not return an array.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return products.length === 0 ? (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5">No Products Yet</Typography>
      <Typography variant="body1">Come Back Later</Typography>
    </Box>
  ) : (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center">
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.thumbnail} // Use fallback if image is missing
                alt={product.name || "Product"}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description || "No description available"}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                  ${product.price?.toFixed(2) || "0.00"}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                component={Link}
                to={`/products/product/${product._id}`}
                sx={{
                  width: "100%",
                }}
              >
                View
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
