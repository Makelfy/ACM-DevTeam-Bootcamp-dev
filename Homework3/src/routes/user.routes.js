import express from "express";

import {
  getAllUser,
  createUser,
  getUserTodo,
  deleteUser,
} from "../services/user.service.js";

import {
  createUserSchema,
  userParamsSchema,
} from "../middlewares/zodValidations/user-validations.js";

import { todoQuerySchema } from "../middlewares/zodValidations/todo-validations.js";

import {
  validate,
  validateUserCreate,
  validateUserId,
} from "../../middlewares/validation.middleware.js";

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
