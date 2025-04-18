const UserModal = require("../Models/UserModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = `SMKZ@$#_938_133`;
const { validationResult } = require("express-validator");

const getAllUsers = async (req, res) => {
  const allUsers = await UserModal.find();
  res.status(200).json({ status: "Success", result: allUsers });
};

const addNewUser = async (req, res) => {
  const errors = validationResult(req); //just for valid email verification

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "validation_error",
      errors: errors.array(),
    });
  }

  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(400).json({
      status: "bad request",
      message: "username,password,name are required fields",
    });
  } else {
    try {
      //for password hashing
      const salt = await bycrypt.genSalt(10);
      const securePassword = await bycrypt.hash(password?.toString(), salt);

      const result = await UserModal.insertOne({
        email: email.replace(/ /g, ""),
        password: securePassword,
        name: name,
      });
      //for Auth-token JWT
      const jwtToken = jwt.sign({ id: result.id }, JWT_SECRET);
      res.status(201).json({
        status: "success",
        message: "User Created Successfully!",
        result: result,
        token: jwtToken,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).json({
          status: "failed",
          message: error.message,
          validationError: true,
        });
      } else {
        res.status(400).json({ status: "failed", message: error.message });
      }
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400).json({
      status: "bad request",
      message: "email,password are required fields",
    });
  } else {
    try {
      const user = await UserModal.findOne({ email: email });
      const userStoredPassword = user.password;
      //for password decryption-unhashing
      const passwordDecrypt = await bycrypt.compare(
        password,
        userStoredPassword
      );
      if (!passwordDecrypt) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        //for Auth-token JWT
        const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET);
        res.status(200).json({
          status: "success",
          message: "Loged in Successfully!",
          token: jwtToken,
          result: user,
        });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).json({ status: "failed", message: error.message });
      } else {
        res.status(400).json({ status: "failed", message: error.message });
      }
    }
  }
};

module.exports = { getAllUsers, addNewUser, loginUser };
