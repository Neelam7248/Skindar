// backend/routes/orderRoutes.js
 const express=require("express") ;
const Order=require("./../models/Orders") ; // we'll create this next

const router = express.Router();

// 📦 POST: Create new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// 🧾 GET: Fetch all orders (for admin or testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
module.exports=router;
