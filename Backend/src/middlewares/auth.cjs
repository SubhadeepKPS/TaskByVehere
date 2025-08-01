const UserModel = require("../models/userModel.cjs");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  console.log("User Auth is getting checked!!");
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);

    // req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
