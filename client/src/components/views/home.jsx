import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        console.log("home response ", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products.");
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <>
      {/* Full-Width Header */}
      <header>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#333333",
            padding: { xs: "10px 0", sm: "20px 0" },
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Typography
              variant="h1"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "uppercase",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              Houston Barn Wood Supply
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/products"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: { xs: "5px 10px", sm: "7px 12px" }, // Adjust padding for smaller screens
                fontSize: { xs: "0.5rem", sm: "0.7rem" }, // Adjust font size for smaller screens
              }}
            >
              Explore Products
            </Button>
          </Toolbar>
        </AppBar>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Box
          sx={{
            height: "80vh",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541715332458879-8f1cb558ffa8?q=80&w=2574&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            textAlign: "center",
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: { xs: 2, sm: 4 },
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                marginBottom: 2,
              }}
            >
              Timeless Elegance in Every Plank
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                marginBottom: 4,
              }}
            >
              Discover reclaimed wood natural beauty for your next project.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              component={Link}
              to="/products"
            >
              Start Shopping
            </Button>
          </Box>
        </Box>

        {/* Featured Products Section */}
        <Container sx={{ padding: { xs: 4, sm: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Featured Products
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Box
                    sx={{
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: 2,
                      overflow: "hidden",
                      textAlign: "center",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        product ? product.imageUrl || product.thumbnail : null
                      }
                      alt={product.name}
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ padding: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: 1,
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginBottom: 2,
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={Link}
                        to={`/products/product/${product._id}`}
                        sx={{ textTransform: "none" }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
    </>
  );
};

export default Homepage;
