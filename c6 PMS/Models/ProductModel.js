const awaisMongo = require("mongoose");

const productScheema = new awaisMongo.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "name should be more than 3 words"],
    },
    price: {
      type: Number,
      required: true,
    },
    halal: {
      type: Boolean,
    },
    expireDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const productModel = awaisMongo.model("product", productScheema);

module.exports = productModel;
