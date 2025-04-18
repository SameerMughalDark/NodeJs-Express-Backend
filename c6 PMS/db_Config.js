const chalk = require("chalk");
const awaisMongo = require("mongoose");

const connectWithMongoDB = async (dbURL) => {
  try {
    const dbConn = await awaisMongo.connect(dbURL);
    if (dbConn) {
      console.log(chalk.bgGreen("Connected With MONGODB-SuccessFully!"));
    }
  } catch (error) {
    console.log(
      chalk.bgRed("Error while connecting with MONGODB->", error.message)
    );
  }
};

module.exports = connectWithMongoDB;
