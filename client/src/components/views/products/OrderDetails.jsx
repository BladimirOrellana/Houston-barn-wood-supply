import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams(); // Assume the route is `/orders/:orderId`
  console.log("params detail ", orderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order details
  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/order/${orderId}`); // Adjust endpoint as needed
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

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

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        maxWidth: "900px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Order Header */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        Order Details
      </Typography>

      {/* Buyer Information */}
      <Paper
        sx={{
          padding: 3,
          marginBottom: 3,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Buyer Information
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {order.userId.firstName}{" "}
          {order.userId.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {order.userId.email}
        </Typography>
      </Paper>

      {/* Order Items */}
      <Paper
        sx={{
          padding: 3,
          marginBottom: 3,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Items
        </Typography>
        <List>
          {order.items.map((item) => (
            <React.Fragment key={item.productId._id}>
              <ListItem>
                <ListItemText
                  primary={item.productId.name}
                  secondary={`Price: $${item.productId.price.toFixed(
                    2
                  )} | Quantity: ${item.quantity} | Subtotal: $${(
                    item.productId.price * item.quantity
                  ).toFixed(2)}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Order Summary */}
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Order Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Order ID:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" textAlign="right">
              {order._id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Date:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" textAlign="right">
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Total Amount:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" textAlign="right">
              ${order.totalAmount.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Status:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              textAlign="right"
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
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default OrderDetails;
