import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
const CartContext = createContext();
import { useUser } from "./UserContext";
import axios from "axios";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity = action.payload.quantity; // Update with the correct quantity from payload

        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "SET_CART": {
      return { ...state, items: action.payload || [] };
    }

    case "CLEAR_CART": {
      return { items: [] };
    }

    default: {
      return state;
    }
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  // Fetch cart from database
  const fetchCart = async (userId) => {
    if (!userId) return; // No need to fetch if user is not logged in
    try {
      const response = await axios.get(`/api/carts/${userId}`);
      cartDispatch({ type: "SET_CART", payload: response.data.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Update cart in the backend whenever there's a change
  const updateCartBackend = async (userId, productId, quantity) => {
    if (!userId) return; // Skip if no user is logged in
    try {
      await axios.post(`/api/carts/add`, {
        userId,
        productId,
        quantity,
      });
      console.log("Cart updated in the backend successfully.");
    } catch (error) {
      console.error("Error updating cart in backend:", error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartState.items.find(
      (item) => item.productId === product.productId
    );

    const newQuantity = existingItem
      ? product.quantity // Update quantity directly
      : product.quantity;

    cartDispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.productId,
        name: product.name,
        quantity: newQuantity,
        price: product.price,
      },
    });

    // Update backend after context is updated
    updateCartBackend(user._id, product.productId, newQuantity);
  };

  useEffect(() => {
    if (user) fetchCart(user._id);
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cartState, cartDispatch, fetchCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
