import { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      component="section"
      sx={{
        padding: { xs: 3, sm: 6 },
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "3rem" },
          marginBottom: 2,
        }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          fontSize: { xs: "1rem", sm: "1.2rem" },
          color: "text.secondary",
          textAlign: "center",
          maxWidth: "600px",
          marginBottom: 4,
        }}
      >
        Got questions? We are here to help! Fill out the form below, and our
        team will get back to you as soon as possible.
      </Typography>

      {/* Contact Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: 4,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>

          {/* Message Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Success Message */}
      {success && (
        <Typography
          variant="body1"
          sx={{
            color: "green",
            marginTop: 2,
          }}
        >
          Thank you! Your message has been sent successfully.
        </Typography>
      )}
    </Box>
  );
};

export default Contact;
