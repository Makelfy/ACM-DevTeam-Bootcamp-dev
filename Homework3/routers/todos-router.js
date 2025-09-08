import express from "express";
import {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../services/todo-service.js";
import { validateTodoCreate, validateTodoId, validate } from "../middleware.js";
import {
  createTodoSchema,
  todoParamsSchema,
  todoQuerySchema,
  updateFullTodoSchema,
  updateHalfTodoSchema,
} from "../zodValidations/todo-validations.js";

const router = express.Router();

router.get("/", validate(todoQuerySchema), getAllTodos);

router.get("/:id", validate(todoParamsSchema), validateTodoId, getTodo);

router.post("/", validate(createTodoSchema), validateTodoCreate, addTodo);

router.put("/:id", validate(updateFullTodoSchema), validateTodoId, updateTodo);

router.patch(
  "/:id",
  validate(updateHalfTodoSchema),
  validateTodoId,
  updateTodo
);

router.delete("/:id", validate(todoParamsSchema), validateTodoId, deleteTodo);

export default router;
