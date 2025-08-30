import express from "express";
import {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService.js";
import {
  validateTodoCreate,
  validateTodoFullUpdate,
  validateTodoHalfUpdate,
  validateTodoId,
} from "../middleware.js";

const router = express.Router();

router.get("/", getAllTodos);

router.get("/:id", validateTodoId, getTodo);

router.post("/", validateTodoCreate, addTodo);

router.put("/:id", validateTodoId, validateTodoFullUpdate, updateTodo);

router.patch("/:id", validateTodoId, validateTodoHalfUpdate, updateTodo);

router.delete("/:id", validateTodoId, deleteTodo);

export default router;
