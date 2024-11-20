import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
} from "@mui/material";

const PlankCalculator = () => {
  const [area, setArea] = useState("");
  const [plankSize, setPlankSize] = useState(0.61); // Default to 16" planks
  const [result, setResult] = useState(null);

  const plankOptions = [
    { label: "16 inches (5.5 width)", coverage: 0.61 },
    { label: "32 inches (5.5 width)", coverage: 1.22 },
    { label: "40 inches (5.5 width)", coverage: 1.53 },
    { label: "50 inches (5.5 width)", coverage: 1.91 },
  ];

  const calculatePlanks = () => {
    if (!area || area <= 0) {
      alert("Please enter a valid area");
      return;
    }
    const planksNeeded = Math.ceil(area / plankSize);
    setResult(planksNeeded);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Plank Calculator
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            marginBottom: 4,
          }}
        >
          Enter the area you want to cover and select your preferred plank size
          to calculate how many you need.
        </Typography>

        <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="Total Area (sq ft)"
            type="number"
            fullWidth
            variant="outlined"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
          />
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <TextField
            select
            label="Choose Plank Size"
            fullWidth
            variant="outlined"
            value={plankSize}
            onChange={(e) => setPlankSize(Number(e.target.value))}
          >
            {plankOptions.map((option, index) => (
              <MenuItem key={index} value={option.coverage}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={calculatePlanks}
          sx={{ padding: "10px 0", fontSize: "1rem" }}
        >
          Calculate
        </Button>

        {result !== null && (
          <Box
            sx={{
              marginTop: 4,
              padding: 3,
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              {result} planks needed
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PlankCalculator;
