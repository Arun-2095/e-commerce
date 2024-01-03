const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["gram", "kilogram", "liter", "milli", "piece"],
    },
    price: {
      type: Number,
      required: true,
    },
    size: String,
    color: String,
  }
);

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
    variant: [VariantSchema],
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1 }, { unique: true });

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = { ProductModel };
