const UserModal = require("../models/User");

const getAllUsers = async (req, res) => {
  const allUsers = await UserModal.find();
  res.status(200).json({ status: "Success", result: allUsers });
};

const addNewUser = async (req, res) => {
  const { username, password, gender } = req.body;
  if (!username || !password || !gender) {
    res.status(400).json({
      status: "bad request",
      message: "username,password,gender are required fields",
    });
  } else {
    try {
      const result = await UserModal.insertOne({
        username: username.replace(/ /g, ""),
        password: password,
        gender: gender,
      });
      res.status(201).json({
        status: "success",
        message: "User Created Successfully!",
        result: result,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).json({ status: "failed", message: error.message });
      } else {
        res.status(400).json({ status: "failed", message: error.message });
      }
    }
  }
};

const updateUserById = async (req, res) => {
  const allowedFields = ["username", "gender", "password"];
  const bodyKeys = Object.keys(req.body);

  // Check if there's any key that's not allowed
  const invalidFields = bodyKeys.filter((key) => !allowedFields.includes(key));

  if (invalidFields.length > 0) {
    return res.status(400).json({
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
      hint: `You can only change these fields username, gender, password`,
    });
  }
  const result = await UserModal.findByIdAndUpdate(
    { _id: req.params.id }, // Filter
    { $set: req.body }
  );
  res.status(200).json({
    status: "success",
    message: "User Updated Successfully!",
    result: req.body,
  });
};

const deleteUserById = async (req, res) => {
  const result = await UserModal.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "User Deleted Successfully!",
    result: result,
  });
};
module.exports = { getAllUsers, addNewUser, updateUserById, deleteUserById };
