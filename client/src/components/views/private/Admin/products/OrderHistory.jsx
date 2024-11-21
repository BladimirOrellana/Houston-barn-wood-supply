import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../../../../GoBackButton/GoBackButton";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders"); // Replace with your API endpoint
      console.error("Fetched orders:", response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <GoBackButton />
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Order History
      </Typography>

      {/* Responsive Layout */}
      {isSmallScreen ? (
        // Mobile-friendly card layout
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Paper
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Order ID: {order._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: ${order.totalAmount.toFixed(2)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "In Transit"
                        ? "orange"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  Status: {order.status}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none", marginTop: 2 }}
                  component={Link}
                  to={`/orders/order/${order._id}`}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Desktop-friendly table layout
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Order ID
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell align="left">{order._id}</TableCell>
                  <TableCell align="left">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{
                        color:
                          order.status === "Delivered"
                            ? "green"
                            : order.status === "In Transit"
                            ? "orange"
                            : order.status === "pending"
                            ? "brown"
                            : "red",

                        fontWeight: "bold",
                      }}
                    >
                      {order.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ textTransform: "none" }}
                      component={Link}
                      to={`/orders/order/${order._id}`}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrderHistory;
