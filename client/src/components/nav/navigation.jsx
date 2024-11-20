import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./../../context/UserContext";
import { useCart } from "./../../context/CartContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Hidden,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const { user } = useUser();
  const { cartState } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cartState.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };

  const links = (
    <>
      <Button component={Link} to="/" color="inherit">
        Home
      </Button>
      <Button component={Link} to="/products" color="inherit">
        Products
      </Button>
      <Button component={Link} to="/about" color="inherit">
        About
      </Button>
      <Button component={Link} to="/contact" color="inherit">
        Contact
      </Button>
      <Button component={Link} to="/calculator" color="inherit">
        Calculator
      </Button>
      {user ? (
        <Button component={Link} to="/profile" color="inherit">
          Account
        </Button>
      ) : (
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
      )}
    </>
  );

  const drawer = (
    <Box
      sx={{ width: 250, backgroundColor: "#f9f9f9", height: "100%" }}
      role="presentation"
      onClick={handleCloseDrawer} // Close the drawer on any click inside
    >
      <List>
        <ListItem button component={Link} to="/" onClick={handleCloseDrawer}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/products"
          onClick={handleCloseDrawer}
        >
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/about"
          onClick={handleCloseDrawer}
        >
          <ListItemText primary="About" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          onClick={handleCloseDrawer}
        >
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/calculator"
          onClick={handleCloseDrawer}
        >
          <ListItemText primary="Calculator" />
        </ListItem>
        {user ? (
          <ListItem
            button
            component={Link}
            to="/profile"
            onClick={handleCloseDrawer}
          >
            <ListItemText primary="Account" />
          </ListItem>
        ) : (
          <ListItem
            button
            component={Link}
            to="/login"
            onClick={handleCloseDrawer}
          >
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Name */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Houston Barn Wood Supply
          </Typography>

          {/* Desktop Links */}
          <Hidden mdDown>{links}</Hidden>

          {/* Cart Icon */}
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge
              badgeContent={totalItems > 0 ? totalItems : null}
              color="error"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navigation;
