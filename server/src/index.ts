import express, { Express } from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import commentRoutes from "./routes/comments";
import likeRoutes from "./routes/likes";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`My first Express app - listening on port ${port}!`);
});
