const express = require("express");
const {
  getAllUsers,
  addNewUser,
  loginUser,
} = require("../Controllers/userController");
const { body } = require("express-validator");
const checkJWTToken = require("../Middleware/checkJWTToken");

const router = express.Router();
const validateUser = [
  body("email").isEmail().withMessage("Invalid email format"),
];

router.post("/api/users", validateUser, addNewUser);
router.post("/api/login", loginUser);
router.get("/api/users", checkJWTToken, getAllUsers); //usign jwt custom middleware that i create my self to get the users data only those who have jwt token

module.exports = router;
