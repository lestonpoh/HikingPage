import Express from "express";
import userRoutes from "./routes/users.js";

const app = Express();

app.use("/api/users", userRoutes);

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
