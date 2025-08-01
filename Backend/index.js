const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database.cjs");
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/authRoute.cjs");
const viewUsersRouter = require("./src/routes/viewUsersRouter.cjs");
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true, // if you're using cookies
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", viewUsersRouter);

connectDB().then(() => {
  console.log("Connected to MySQL2");
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
