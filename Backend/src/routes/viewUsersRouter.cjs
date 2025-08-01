const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/dbpool.cjs");
const viewUsersRouter = express.Router();

viewUsersRouter.get("/viewusers", async (req, res) => {
  try {
    console.log(req);

    const token = req.cookies.token;
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const decodedToken = jwt.verify(token, "vehere@2025");
    console.log(decodedToken);

    const { id } = decodedToken;
    // console.log(id);

    const user = await db.query("SELECT * FROM users WHERE id = ?", id);

    if (user.length > 0) {
      const users = await db.query(
        "SELECT id, name, email, profileUrl, role, created_at FROM users"
      );
      const userList = users[0];
      res.status(200).json({ message: "Users fetched successfully", userList });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = viewUsersRouter;
