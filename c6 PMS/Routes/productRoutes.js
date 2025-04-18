const express = require("express");
const productModel = require("../Models/ProductModel");
const { getAllProducts } = require("../Controllers/productController");
const productRouter = express.Router();

productRouter.get("/api/products", getAllProducts);

productRouter.post("/api/products", async (req, res) => {
  try {
    const { name, price, halal, expireDate } = req.body;
    if (!name || !price || halal === undefined || !expireDate) {
      res.status(400).json({
        status: "failed",
        message: "Required Fields are name,price,halal,expireDate",
      });
    } else {
      const result = await productModel.insertOne({
        name: name,
        halal: halal,
        price: price,
        expireDate: expireDate,
      });
      res.status(201).json({
        status: "success",
        result: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});
productRouter.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, halal, expireDate } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, halal, expireDate },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: "failed", message: "Product not found" });
    }

    res.status(200).json({
      status: "success",
      result: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});
productRouter.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});
module.exports = productRouter;
