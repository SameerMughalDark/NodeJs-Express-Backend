const jwt = require("jsonwebtoken");
const JWT_SECRET = `SMKZ@$#_938_133`;

const checkJWTToken = async (req, res, next) => {
  //if we want to add custom header
  // const token = req.header("auth-token");

  //if we want to add bearer-for Bearer token getting from headers
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    res.status(401).send({ message: "Auth Token Required" });
  }
  try {
    const verifyToken = jwt.verify(token, JWT_SECRET);
    req.user = verifyToken;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Auth Token Required", error: error.message });
  }
};

module.exports = checkJWTToken;
