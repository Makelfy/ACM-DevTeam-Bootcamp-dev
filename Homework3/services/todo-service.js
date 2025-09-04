import { applyFilters } from "../middleware.js";

import { AppDataSource } from "../db/data-source.js";
import { TodosSchema } from "../schema/todos.schema.js";

const todoRepository = AppDataSource.getRepository(TodosSchema);

export const getAllTodos = async (req, res) => {
  const todos = await todoRepository.find({ relations: ["user"] });
  const filteredTodos = applyFilters(todos, req.query);
  res.status(200).json(filteredTodos);
};

export const getTodo = async (req, res) => {
  const todo = await todoRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["user"],
  });
  res.status(200).json(todo);
};

export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;
  const newTodo = todoRepository.create({
    title,
    description,
    userId: Number(userId),
    completed: false,
  });

  const savedTodo = await todoRepository.save(newTodo);

  res.status(201).json(savedTodo);
};

export const updateTodo = async (req, res) => {
  const todo = await todoRepository.findOneBy({ id: Number(req.params.id) });

  todo.title = req.body.title ?? todo.title;
  todo.description = req.body.description ?? todo.description;
  todo.completed = req.body.completed ?? todo.completed;

  const savedTodo = await todoRepository.save(todo);

  res.status(200).json(savedTodo);
};

export const deleteTodo = async (req, res) => {
  await todoRepository.delete({ id: Number(req.params.id) });

  res.status(204).send();
};
