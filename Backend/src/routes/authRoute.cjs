const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel.cjs");
const jwt = require("jsonwebtoken");
const db = require("../config/dbpool.cjs");

authRouter.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password, profileUrl, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.createUser({
      name,
      email,
      password: passwordHash,
      profileUrl,
      role,
    });
    console.log("User created: ", user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// authRouter.post("/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
//       email,
//     ]);
//     console.log(user);

//     if (!user || user.length === 0) {
//       res.status(401).json({ message: "Invalid email or password" });
//     } else {
//       const passwordMatch = await bcrypt.compare(password, user[0].password);
//       if (passwordMatch) {
//         // const token = await user[0].getJWT();
//         const token = jwt.sign({ id: user[0].id }, "vehere@2025", {
//           expiresIn: "1h",
//         });
//         console.log("Token1: " + token);
//         res
//           .cookie("tokens", token, {
//             httpOnly: true,
//             expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//           })
//           .status(200)
//           .json({ message: "Login successful", user });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

authRouter.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user[0].id }, "vehere@2025", {
      expiresIn: "1h",
    });

    const { password: _, ...safeUser } = user[0];

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful", user: safeUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;
