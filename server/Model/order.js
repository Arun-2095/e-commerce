const mongoose = require("mongoose");

const productDetailSchema = new mongoose.Schema({
  productId: mongoose.Types.ObjectId,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  userId: mongoose.Types.ObjectId,
  orderDate: { type: Date, default: Date.now() },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };
