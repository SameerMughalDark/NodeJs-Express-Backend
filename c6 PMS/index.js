const chalk = require("chalk");
const express = require("express");
const connectWithMongoDB = require("./db_Config");
const productRouter = require("./Routes/productRoutes");
const app = express();
app.use(express.json()); //now we are able to get bodyjson data

const PORT = 8000;

connectWithMongoDB(`mongodb://localhost:27017/PMS`);
app.use(productRouter);

app.listen(PORT, () => {
  const stylishClikedURL = chalk.bgGreenBright(`http://localhost:${PORT}`);
  console.log(`Awais Your Server is Running on  ${stylishClikedURL}`);
});
