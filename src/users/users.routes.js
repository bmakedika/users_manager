import { Router } from "express";
import {
  handleBulkCreateUsers,
  handleCountUsers,
  handleCreateUser,
  handleDeleteUserById,
  handleGetUserById,
  handleListUsers,
  handleSearchUserByEmail,
  handleUpdateUser,
  handleUpdateUserPassword,
} from "./users.controller.js";

const router = Router();

router.post("/bulk", handleBulkCreateUsers);
router.post("/", handleCreateUser);

router.get("/search", handleSearchUserByEmail);
router.get("/count", handleCountUsers);
router.get("/", handleListUsers);

router.get("/:id", handleGetUserById);

router.delete("/:id", handleDeleteUserById);

router.patch("/:id/password", handleUpdateUserPassword);
router.patch("/:id", handleUpdateUser);

export default router;
