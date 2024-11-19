import { createRoot } from "react-dom/client";

import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "@mui/material/styles";
import { CartProvider } from "./context/CartContext";
import theme from "./assets/theme/theme.js";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID_SANDBOX; // Use import.meta.env
const initialOptions = {
  "client-id": clientId,
  currency: "USD",
};

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <PayPalScriptProvider options={initialOptions}>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </PayPalScriptProvider>
  </ThemeProvider>
);
