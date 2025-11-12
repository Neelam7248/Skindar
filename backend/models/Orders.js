// backend/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      postalCode: String,
      address: String,
      paymentMethod: String,
    },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        images: [String],
      },
    ],
    subtotal: Number,
    serviceCharge: Number,
    grandTotal: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports=Order;
