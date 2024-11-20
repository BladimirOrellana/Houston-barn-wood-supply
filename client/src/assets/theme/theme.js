import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B4513", // Rustic Brown
    },
    secondary: {
      main: "#FF8C42", // Warm Orange
    },
    background: {
      default: "#F5F5DC", // Soft Beige
      paper: "#FFFFFF", // Card backgrounds
    },
    text: {
      primary: "#333333", // Charcoal Gray
      secondary: "#555555", // Lighter gray for less emphasis
    },
    success: {
      main: "#228B22", // Forest Green for accents
    },
    error: {
      main: "#D32F2F", // Optional: For error messages
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevents all-uppercase buttons
          textDecoration: "none", // Removes underline for links used in Button
          "&:hover": {
            textDecoration: "none", // Ensures no underline on hover
          },
        },
      },
    },
  },
});

export default theme;
