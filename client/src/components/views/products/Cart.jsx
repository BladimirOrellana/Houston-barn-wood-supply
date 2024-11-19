import {} from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useCart } from "./../../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartState } = useCart();

  // Ensure cartState.items is an array before calculating totals
  const items = cartState?.items || [];

  // Total items and total price calculations
  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const totalPrice = items.reduce((acc, item) => {
    // Ensure productId and price exist before calculation
    const price = item.productId?.price || 0;
    return acc + item.quantity * price;
  }, 0);

  return (
    <Box sx={{ padding: 4, maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Cart ({totalItems} items)
      </Typography>
      {items.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.productId?._id || item.productId}
                sx={{ borderBottom: "1px solid #ccc" }}
              >
                <ListItemText
                  primary={item.productId?.name || "Unnamed Product"}
                  secondary={`Quantity: ${item.quantity || 0} | Price: $${
                    item.productId?.price || "0.00"
                  } | Total: $${
                    (item.quantity || 0) * (item.productId?.price || 0)
                  }`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold" }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        component={Link}
        to="/checkout"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default Cart;
