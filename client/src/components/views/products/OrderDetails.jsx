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
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../../GoBackButton/GoBackButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./../../../context/UserContext";

const OrderDetails = () => {
  const { user } = useUser();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/order/${orderId}`);
      setOrder(response.data);
      setNewStatus(formatStatus(response.data.status)); // Format the status to match options
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details.");
      setLoading(false);
    }
  };

  const formatStatus = (status) => {
    // Ensure the status matches one of the available options
    const validStatuses = ["Pending", "In Transit", "Delivered"];
    return (
      validStatuses.find((s) => s.toLowerCase() === status.toLowerCase()) ||
      "Pending"
    );
  };

  const updateOrderStatus = async () => {
    try {
      const response = await axios.put(`/api/orders/order/${orderId}`, {
        status: newStatus,
      });
      console.log("response order ", response.data);
      setOrder({ ...order, status: newStatus }); // Update status in the UI
      toast.success("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status.");
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
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: { xs: 3, sm: 5 },
        }}
      >
        <GoBackButton />
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
                <strong>Order ID:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{ textAlign: "right", color: "#555" }}
              >
                {order._id}
              </Typography>
            </Grid>
            {user && user.role === "admin" ? (
              <>
                {" "}
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    <strong>Status:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    style={{
                      color:
                        order.status === "pending"
                          ? "red"
                          : order.status === "In Transit"
                          ? "orange"
                          : "Green",
                    }}
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    fullWidth
                  >
                    <MenuItem
                      style={{
                        color: order.status === "pending" ? "red" : null,
                      }}
                      value="Pending"
                    >
                      Pending
                    </MenuItem>
                    <MenuItem
                      style={{
                        color: order.status === "In Transit" ? "Orange" : null,
                      }}
                      value="In Transit"
                    >
                      In Transit
                    </MenuItem>
                    <MenuItem
                      style={{
                        color: order.status === "Delivery" ? "Green" : null,
                      }}
                      value="Delivered"
                    >
                      Delivered
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateOrderStatus}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Update Status
                  </Button>
                </Grid>{" "}
              </>
            ) : null}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderDetails;
