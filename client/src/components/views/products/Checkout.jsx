import { useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "./../../../context/CartContext";
import cartApi from "../../../apis/cartApi";
import axios from "axios";
import { useUser } from "./../../../context/UserContext";
import { Box, Typography } from "@mui/material";

const Checkout = () => {
  const { cartState, cartDispatch } = useCart(); // Access cartState from useCart
  const { user } = useUser();

  // Calculate total price
  const totalPrice = cartState.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const saveOrder = async (paymentDetails) => {
    try {
      // Construct order payload
      const orderPayload = {
        userId: user._id,
        items: cartState.items.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalAmount: totalPrice,
        paymentDetails,
      };

      // Send the order to the backend
      const response = await axios.post("/api/orders", orderPayload);
      console.log("Order saved successfully:", response.data);

      const data = {
        userId: user._id,
      };

      // Clear the cart in the database
      await cartApi.removeItem(data);
      console.log("Cart cleared successfully.");

      // Dispatch action to clear the cart in the context
      cartDispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error saving order or clearing cart:", error);
    }
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert(`Transaction completed by ${details.payer.name.given_name}`);
      saveOrder(details); // Save the order and clear the cart
    });
  };

  useEffect(() => {
    if (user) {
      cartApi
        .getCart(user._id)
        .then((response) => {
          console.log("Fetched cart:", response.data);
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
        });
    }
  }, [user]); // Fetch cart when component mounts and user is logged in

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Checkout
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={handleApprove}
      />
    </Box>
  );
};

export default Checkout;
