import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navigation from "./components/nav/navigation";
import Home from "./components/views/home";
import NotFound from "./components/views/noFound";
import Profile from "./components/views/private/Profile";
import About from "./components/views/about";
import Contact from "./components/views/contact";
import ProductList from "./components/views/products/ProductList";
import OrderHistory from "./components/views/products/OrderHistory";
import ProductDetails from "./components/views/products/ProductDetails";

import Cart from "./components/views/products/Cart";
import Checkout from "./components/views/products/Checkout";
import OrderDetails from "./components/views/products/OrderDetails";
const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/order/:orderId" element={<OrderDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
