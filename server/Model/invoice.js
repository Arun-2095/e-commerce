const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: true
  },
  total: {
     type: Number,
     required: true
  },
  orderStatus : {
    type: String,
    enum : ['orderPlaced','outForDelivery','delivered'],
  },
  orderDate: { type: Date, default: Date.now() },
});

const invoiceModel = mongoose.model("invoice", invoiceSchema);

module.exports = { invoiceModel };
