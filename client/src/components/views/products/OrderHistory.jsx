import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders"); // Replace with your API endpoint
      console.error(" fetching orders set:", response.data);
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
      {/* Header */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Order History
      </Typography>

      {/* Order Table */}
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
                Quantity
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
                  {order.items.map((item) => item.quantity)}
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
                          : "blue",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "orange" }}
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
    </Box>
  );
};

export default OrderHistory;
