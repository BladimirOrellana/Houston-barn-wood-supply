import { useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "./../../../context/CartContext";
import cartApi from "../../../apis/cartApi";
import axios from "axios";
import { useUser } from "./../../../context/UserContext";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartState, cartDispatch } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  // Calculate total price
  const totalPrice = cartState.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const saveOrder = (paymentDetails) => {
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

    axios
      .post("/api/orders", orderPayload)
      .then((response) => {
        const orderId = response.data.order._id;

        // Clear the cart in the database
        cartApi
          .removeItem({ userId: user._id })
          .then(() => {
            cartDispatch({ type: "CLEAR_CART" });

            // Explicitly redirect user to order details page
          })
          .catch((error) => {
            console.error("Error clearing cart:", error);
            console.error("Error clearing cart:", error);
          });
      })
      .catch((error) => {
        console.error("Error saving order:", error);
      });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      saveOrder(details); // Save the order and clear the cart
      navigate(`/`);
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
  }, [user]);

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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Cancel
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
