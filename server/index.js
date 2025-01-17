import Express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";

const app = Express();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.get("/api/hikes", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Hike1",
      elevation: 1000,
      difficulty: 1,
      duration: 1,
    },
    {
      id: 2,
      name: "Hike2",
      elevation: 2000,
      difficulty: 2,
      duration: 2,
    },
    {
      id: 3,
      name: "Hike3",
      elevation: 3000,
      difficulty: 3,
      duration: 3,
    },
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
