const mongo = require("mongoose");

//mongodb conncetion

const connectWithMongoDB = async (dbURL) => {
  try {
    const con = await mongo.connect(dbURL);
    if (con) {
      console.log(`Connected With MongoDB Successfully!`);
    }
  } catch (error) {
    console.log("Error While Connecting with MongoDB", error.message);
  }
};

module.exports = connectWithMongoDB;
