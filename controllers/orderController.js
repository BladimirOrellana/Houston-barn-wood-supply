const Order = require("./../models/orders");
const Cart = require("./../models/cart");
const Product = require("./../models/products");

// Create an order from cart
exports.createOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // Clear the user's cart after creating an order
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Get orders for a user
exports.getOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate(
      "items.productId",
      "name price"
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "name price")
      .populate("userId", "firstName lastName email") // Optional: populate user info
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
// Get order details by orderId
exports.getOrderDetails = async (req, res) => {
  console.error("order details 1:", req.params);
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("items.productId", "name price description images")
      .populate("userId", "firstName lastName email");
    console.error("order details: database", order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Failed to fetch order details", error });
  }
};
