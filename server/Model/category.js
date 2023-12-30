const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
});

const CategoryModel = mongoose.model("Category", categorySchema);

CategoryModel.createIndexes({name: 1});
module.exports = {CategoryModel}