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
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../../GoBackButton/GoBackButton";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/order/${orderId}`);
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
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <GoBackButton />
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: { xs: 3, sm: 5 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 4,
            color: "#333",
          }}
        >
          Order Details
        </Typography>

        {/* Buyer Information */}
        <Paper
          sx={{
            padding: 3,
            marginBottom: 4,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#444" }}
          >
            Buyer Information
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            <strong>Name:</strong> {order.userId.firstName}{" "}
            {order.userId.lastName}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            <strong>Email:</strong> {order.userId.email}
          </Typography>
        </Paper>

        {/* Order Items */}
        <Paper
          sx={{
            padding: 3,
            marginBottom: 4,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#444" }}
          >
            Items Ordered
          </Typography>
          <List>
            {order.items.map((item) => (
              <React.Fragment key={item.productId._id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "500" }}
                      >
                        {item.productId.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ color: "#777" }}>
                          Price: ${item.productId.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#777" }}>
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#777" }}>
                          Subtotal: $
                          {(item.productId.price * item.quantity).toFixed(2)}
                        </Typography>
                      </>
                    }
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
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#444" }}
          >
            Order Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                <strong>Order ID: {order._id}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right"></Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                <strong>Date:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="body1" sx={{ color: "#555" }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                <strong>Total Amount:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                ${order.totalAmount.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                <strong>Status:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color:
                    order.status === "Delivered"
                      ? "green"
                      : order.status === "In Transit"
                      ? "orange"
                      : "blue",
                }}
              >
                {order.status}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderDetails;
