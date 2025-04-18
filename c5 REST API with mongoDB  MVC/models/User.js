const mongoose = require("mongoose");

//scheema for users table/Collection
const userSceehma = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username already in used!"], // Ensures no two users can have the same username
    },
    password: {
      type: String,
      required: true,
      minlength: [3, "Paswword should be more than 3characters"],
    },
    gender: {
      type: String,
      enum: {
        values: ["m", "f"],
        message: "Gender must be either 'm' or 'f'",
      },
      required: true,
    },
  },
  { timestamps: true }
);

//creating modal
const UserModal = mongoose.model("user", userSceehma);

module.exports = UserModal;
