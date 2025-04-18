const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: [3, "Password must be contains at least 3 characters"],
    },
  },
  { timestamps: true }
);

const userModal = mongoose.model("user", userSchema);

module.exports = userModal;
