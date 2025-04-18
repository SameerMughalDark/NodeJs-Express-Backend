const PORT = 8000;
const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies(for getting values from raw-bodyjson)
app.use(express.urlencoded({ extended: false })); // Middleware to parse JSON bodies(for getting values from formdata)

const fs = require("fs");
const usersDATAFile = require("./mydata/usersDATA.json");

app.get("/api/users", (req, res) => {
  res.json(usersDATAFile).end();
});
app.get("/api/users/:id", (req, res) => {
  const getUserById = usersDATAFile.filter(
    (itms) => itms.userID == req.params.id
  );
  res.json(getUserById).end();
});
app.post("/api/createuser/", (req, res) => {
  const { name, gender } = req.body;
  if (!name || !gender) {
    res.status(400).json({ error: "name and gender are required." });
  } else {
    const newUserInfo = {
      id: usersDATAFile?.length,
      name: name,
      gender: gender,
    };
    usersDATAFile.push({ ...newUserInfo });
    fs.writeFile(
      "./mydata/usersDATA.json",
      JSON.stringify(usersDATAFile),
      (err, data) => {
        res.status(201).json({
          message: "user created successfully!",
          name: name,
          gender: gender,
        });
      }
    );
  }
});

app.listen(PORT, () => {
  console.log(
    `Server is Running click here to VISIT the Server-> http://localhost:${PORT}`
  );
});
