const productModel = require("../Models/ProductModel");

const getAllProducts = async (req, res) => {
  const result = await productModel.find();
  res.status(200).json({
    status: "success",
    result: result,
  });
};

module.exports = { getAllProducts };
