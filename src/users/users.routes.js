import { Router } from "express";
import {
  handleCreateUser,
  handleListUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUser,
} from "./users.controller.js";

const router = Router();

// Users routes
router.post("/", handleCreateUser);

router.get("/", handleListUsers);

router.get("/:id", handleGetUserById);

router.delete("/:id", handleDeleteUserById);

router.patch("/:id", handleUpdateUser);

export default router;
