import express from "express";

import {
  createTodoSchema,
  todoParamsSchema,
  todoQuerySchema,
  updateFullTodoSchema,
  updateHalfTodoSchema,
} from "../middlewares/zodValidations/todo-validations.js";
import {
  validate,
  validateTodoCreate,
  validateTodoId,
} from "../middlewares/validation.middleware.js";

import {
  addTodoController,
  deleteTodoController,
  getAllTodosController,
  getTodoController,
  updateTodoController,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", validate(todoQuerySchema), getAllTodosController);

router.get(
  "/:id",
  validate(todoParamsSchema),
  validateTodoId,
  getTodoController
);

router.post(
  "/",
  validate(createTodoSchema),
  validateTodoCreate,
  addTodoController
);

router.put(
  "/:id",
  validate(updateFullTodoSchema),
  validateTodoId,
  updateTodoController
);

router.patch(
  "/:id",
  validate(updateHalfTodoSchema),
  validateTodoId,
  updateTodoController
);

router.delete(
  "/:id",
  validate(todoParamsSchema),
  validateTodoId,
  deleteTodoController
);

export default router;
