const express = require("express");
const {
  getAllUsers,
  addNewUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUsers);

router.post("/", addNewUser);

router.patch("/update/:id", updateUserById);
router.delete("/deleteuser/:id", deleteUserById);

module.exports = router;
