import express from "express";
import {
  getAllUser,
  createUser,
  getUserTodo,
  deleteUser,
} from "../services/user-service.js";
import { validateUserCreate, validateUserId, validate } from "../middleware.js";
import {
  createUserSchema,
  userParamsSchema,
} from "../zodValidations/user-validations.js";
import { todoQuerySchema } from "../zodValidations/todo-validations.js";

const router = express.Router();
router.get("/", getAllUser);

router.post("/", validate(createUserSchema), createUser);

router.get(
  "/:id/todos",
  validate(userParamsSchema),
  validateUserId,
  validate(todoQuerySchema),
  getUserTodo
);

router.delete("/:id", validate(userParamsSchema), validateUserId, deleteUser);

export default router;
