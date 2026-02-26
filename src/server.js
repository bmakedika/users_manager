import express from "express";
import usersRouter from "./users/users.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Users Management API",
  });
});
app.use("/users", usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
