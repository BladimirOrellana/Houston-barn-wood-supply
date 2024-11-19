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
