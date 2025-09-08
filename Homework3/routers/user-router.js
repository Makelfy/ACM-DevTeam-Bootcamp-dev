import express from "express";
import {
  getAllUser,
  createUser,
  getUserTodo,
  deleteUser,
} from "../services/user-service.js";
import { validateUserId, validate, validateUserCreate } from "../middleware.js";
import {
  createUserSchema,
  userParamsSchema,
} from "../zodValidations/user-validations.js";
import { todoQuerySchema } from "../zodValidations/todo-validations.js";

const router = express.Router();
router.get("/", getAllUser);

router.post("/", validate(createUserSchema), validateUserCreate, createUser);

router.get(
  "/:id/todos",
  validate(userParamsSchema),
  validateUserId,
  validate(todoQuerySchema),
  getUserTodo
);

router.delete("/:id", validate(userParamsSchema), validateUserId, deleteUser);

export default router;
