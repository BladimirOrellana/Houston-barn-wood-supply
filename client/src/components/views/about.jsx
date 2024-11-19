import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Box
      component="section"
      sx={{
        padding: { xs: 3, sm: 6 },
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          paddingBottom: 6,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "3rem" },
            marginBottom: 2,
          }}
        >
          About Houston Barn Wood Supply
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem" },
            color: "text.secondary",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Welcome to Houston Barn Wood Supply, your trusted source for premium,
          reclaimed barn wood in the Houston area. We specialize in old cedar
          wood planks, perfect for adding rustic charm to your projects.
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid
        container
        spacing={4}
        sx={{
          marginBottom: 6,
        }}
      >
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" component="p">
              At Houston Barn Wood Supply, our mission is to provide
              high-quality, sustainable reclaimed wood for homeowners, DIY
              enthusiasts, and professional builders in the Houston area. We
              believe in giving wood a second life while adding character to
              your spaces.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              Why Choose Us
            </Typography>
            <Typography variant="body1" component="p">
              We offer a unique selection of barn wood, specializing in old
              cedar wood planks that are locally sourced and environmentally
              friendly. Our expert team ensures every piece meets the highest
              quality standards.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* CTA Section */}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Ready to Start Your Project?
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: "text.secondary",
            marginBottom: 4,
          }}
        >
          Browse our collection or get in touch with us today for more
          information about our products and services.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: "10px 20px",
            textTransform: "none",
          }}
          component={Link} // Replace with your products page route
          to="/products"
        >
          View Products
        </Button>
      </Box>
    </Box>
  );
};

export default About;
