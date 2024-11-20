import {} from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";
import { useCart } from "./../../../context/CartContext";
import { Link } from "react-router-dom";
import { useUser } from "./../../../context/UserContext";
const Cart = () => {
  const { user } = useUser();
  const userId = user ? user._id : null;
  const { cartState, cartDispatch } = useCart(); // Access dispatch for state updates

  // Ensure cartState.items is an array before calculating totals
  const items = cartState?.items || [];

  // Total items and total price calculations
  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const totalPrice = items.reduce((acc, item) => {
    // Ensure productId and price exist before calculation
    const price = item.productId?.price || 0;
    return acc + item.quantity * price;
  }, 0);
  console.log("cart state ", cartState);
  // Function to clear the cart
  const clearCart = async () => {
    try {
      // Make a request to clear the cart in the backend
      await axios.delete(`/api/carts/${userId}/clear`);
      // Dispatch action to clear the cart in the context
      cartDispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

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
      <Button
        variant="outlined"
        color="secondary"
        sx={{ marginTop: 2, marginLeft: 2 }}
        onClick={clearCart}
        disabled={items.length === 0}
      >
        Clear Cart
      </Button>
    </Box>
  );
};

export default Cart;
