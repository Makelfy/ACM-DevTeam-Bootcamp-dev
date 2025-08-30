import { todos } from "../db/Todo.js";
import { applyFilters } from "../middleware.js";

export const getAllTodos = (req, res) => {
  const filteredTodos = applyFilters(todos, req.query);
  res.status(200).json(filteredTodos);
};

export const getTodo = (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);

  res.status(200).json(todo);
};

export const addTodo = (req, res) => {
  const newTodo = {
    id: (todos.length + 1).toString(),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed ? true : false,
    userId: req.body.userId,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === req.params.id);

  const title = req.body.title ? req.body.title : todos[todoIndex].title;
  const description = req.body.description
    ? req.body.description
    : todos[todoIndex].description;
  const completed = req.body.completed ? true : false;

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title,
    description: description,
    completed: completed,
  };
  res.status(200).json(todos[todoIndex]);
};

export const deleteTodo = (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === req.params.id);

  todos.splice(todoIndex, 1);
  res.status(204).send();
};
