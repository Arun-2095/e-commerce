const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    unique: true,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: String,
  color: String,
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
    },
    description: String,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    variant: [
      {
        quantity: {
          type: Number,
          required: true,
          unique: true,
        },
        unit: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        size: String,
        color: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1 }, { unique: true });

ProductSchema.index({ "variant.quantity": 1 }, { unique: true });

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = { ProductModel };
