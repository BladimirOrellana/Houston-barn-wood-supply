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
      console.log("products ", response.data);
      setProducts(response.data);
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
    <Box>
      <div style={{ textAlign: "center" }}>
        {" "}
        <h1>No Products Yet</h1>
      </div>
    </Box>
  ) : (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center">
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card style={{ padding: 10 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]} // Ensure `product.image` is a valid URL
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                component={Link}
                to={`/products/product/${product._id}`}
                sx={{
                  width: "calc(100% )", // Full width minus margin (adjust if needed)
                  alignSelf: "center", // Ensures button centers horizontally in Card
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
