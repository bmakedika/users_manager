import { Router } from "express";
import { handleCreateUser } from "./users.controller.js";

// Users routes

const router = Router();
router.post("/", handleCreateUser);

export default router;
