import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const Homepage = () => {
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
              component="h1"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "uppercase",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              Houston Barn Wood Supply
            </Typography>
          </Toolbar>
        </AppBar>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Box
          sx={{
            height: "90vh",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1715322458879-8f1cb558ffa8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
              Transform Your Spaces
            </Typography>
            <Typography
              variant="h3"
              component="p"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                marginBottom: 4,
              }}
            >
              Discover the timeless beauty of reclaimed wood in Houston for your
              next project.
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
              Shop Now
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
          <Grid container spacing={4}>
            {[
              {
                name: "Reclaimed Cedar Plank",
                description:
                  "Premium cedar wood, perfect for rustic decor and furniture.",
                image: "https://source.unsplash.com/400x300/?wood,plank",
                alt: "Reclaimed Cedar Plank",
              },
              {
                name: "Vintage Barn Wood Panel",
                description:
                  "Authentic barn wood panel, ideal for wall paneling.",
                image: "https://source.unsplash.com/400x300/?wood,panel",
                alt: "Vintage Barn Wood Panel",
              },
              {
                name: "Rustic Cedar Beams",
                description:
                  "Sturdy cedar beams for construction or design projects.",
                image: "https://source.unsplash.com/400x300/?wood,beam",
                alt: "Rustic Cedar Beams",
              },
            ].map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                    src={product.image}
                    alt={product.alt}
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
                      href="/products"
                      sx={{ textTransform: "none" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Homepage;
