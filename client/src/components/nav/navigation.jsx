import {} from "react";
import { Link } from "react-router-dom";
import { useUser } from "./../../context/UserContext";
import { useCart } from "./../../context/CartContext"; // Import CartContext
import { Button, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Navigation() {
  const { user } = useUser();
  const { cartState } = useCart(); // Access cartState from CartContext

  // Calculate total items in the cart
  const totalItems = cartState.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  console.log("Cart items in Navigation:", cartState.items);
  console.log("Total items in Navigation:", totalItems);

  return (
    <nav style={{ margin: 20, display: "flex", alignItems: "center", gap: 16 }}>
      <Button component={Link} to="/" color="primary" variant="text">
        Home
      </Button>
      <Button component={Link} to="/products" color="primary" variant="text">
        Products
      </Button>
      <Button component={Link} to="/about" color="primary" variant="text">
        About
      </Button>
      <Button component={Link} to="/contact" color="primary" variant="text">
        Contact
      </Button>

      {user ? (
        <Button component={Link} to="/profile" color="primary" variant="text">
          Account
        </Button>
      ) : (
        <Button component={Link} to="/login" color="primary" variant="text">
          Login
        </Button>
      )}

      {/* Cart Icon */}
      <IconButton component={Link} to="/cart" color="primary" aria-label="cart">
        <Badge badgeContent={totalItems > 0 ? totalItems : null} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </nav>
  );
}

export default Navigation;
