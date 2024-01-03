const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: Date,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: [
    {
      name: { type: String, required: true },
      pincode: { type: Number, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

userModel.createIndexes({ email: 1 });
userModel.createIndexes({ phoneNumber: 1 });

module.exports = { userModel };
