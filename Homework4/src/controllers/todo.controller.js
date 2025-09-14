import { AppError } from "../middlewares/error.middleware.js";
import {
  getAllTodosService,
  getTodoService,
  addTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todo.service.js";

export const getAllTodosController = async (req, res, next) => {
  try {
    const todos = await getAllTodosService(req.validatedQuery, req.userId);
    res.status(200).json(todos);
  } catch (error) {
    next(new AppError("Failed to get todos", 500));
  }
};

export const getTodoController = async (req, res, next) => {
  try {
    const todo = await getTodoService(req.validatedParams.id, req.userId);
    res.status(200).json(todo);
  } catch (error) {
    next(new AppError("Failed to get todo", 500));
  }
};

export const addTodoController = async (req, res, next) => {
  try {
    const savedTodo = await addTodoService(req.validatedBody, req.userId);
    res.status(201).json(savedTodo);
  } catch (error) {
    next(new AppError("Failed to add todo", 500));
  }
};

export const updateTodoController = async (req, res, next) => {
  try {
    const savedTodo = await updateTodoService(
      req.validatedParams.id,
      req.userId,
      req.validatedBody
    );
    res.status(200).json(savedTodo);
  } catch (error) {
    next(new AppError("Failed to update todo", 500));
  }
};

export const deleteTodoController = async (req, res, next) => {
  try {
    await deleteTodoService(req.validatedParams.id, req.userId);
    res.status(204).send();
  } catch (error) {
    next(new AppError("Failed to delete todo", 500));
  }
};
