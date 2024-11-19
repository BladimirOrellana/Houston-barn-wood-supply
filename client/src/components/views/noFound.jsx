import {} from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", color: "#1976d2" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ marginTop: 2 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
