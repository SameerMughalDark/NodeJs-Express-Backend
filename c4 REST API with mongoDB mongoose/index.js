const PORT = 8000;
const express = require("express");
const app = express();
const mongo = require("mongoose");

app.use(express.json()); // Middleware to parse JSON bodies(for getting values from raw-bodyjson)
app.use(express.urlencoded({ extended: false })); // Middleware to parse JSON bodies(for getting values from formdata)

//mongodb conncetion
mongo
  .connect(`mongodb://localhost:27017/UMS`)
  .then(() => {
    console.log(`Sameer MongoDB Connected Successfully!`);
  })
  .catch((err) => {
    console.error(`Error in Connection of MongoDB`, err);
  });

//scheema for users table/Collection
const userSceehma = new mongo.Schema(
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
const UserModal = mongo.model("user", userSceehma);

//routes
app.get("/api/users", async (req, res) => {
  const allUsers = await UserModal.find();
  res.status(200).json({ status: "Success", result: allUsers });
});
app.post("/api/users", async (req, res) => {
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
});
app.patch("/api/updateuser/:id", async (req, res) => {
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
    result: result,
  });
});
app.delete("/api/deleteuser/:id", async (req, res) => {
  const result = await UserModal.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "User Deleted Successfully!",
    result: result,
  });
});
app.listen(PORT, () => {
  console.log(
    `Server is Running click here to VISIT the Server-> http://localhost:${PORT}`
  );
});
