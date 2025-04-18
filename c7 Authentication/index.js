const PORT = 8000;
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const connectWithMongoDB = require("./db_Config");
app.use(express.json()); // Middleware to parse JSON bodies(for getting values from raw-bodyjson)
app.use(express.urlencoded({ extended: false })); // Middleware to parse JSON bodies(for getting values from formdata)

connectWithMongoDB(`mongodb://localhost:27017/Auth_Learning`);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(
    `Server is Running click here to VISIT the Server-> http://localhost:${PORT}`
  );
});
