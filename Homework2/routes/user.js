import express from "express";
import {
  getAllUser,
  createUser,
  getUserTodo,
} from "../services/userService.js";
import { validateUserCreate, validateUserId } from "../middleware.js";

const router = express.Router();
router.get("/", getAllUser);

router.post("/", validateUserCreate, createUser);

router.get("/:id/todos", validateUserId, getUserTodo);

export default router;
