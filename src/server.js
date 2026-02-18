import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./users/users.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Users Management API",
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use("/users", usersRoutes);
