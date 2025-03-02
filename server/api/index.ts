import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/auth";
import userRoutes from "../src/routes/users";
import commentRoutes from "../src/routes/commentRoute";
import hikeRoutes from "../src/routes/hikeRoute";
import replyRoutes from "../src/routes/replyRoute";
const path = require("path");
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/hike", hikeRoutes);
app.use("/api/reply", replyRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running - listening on port ${port}!`);
});
