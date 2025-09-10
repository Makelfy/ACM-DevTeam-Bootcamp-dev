import { AppDataSource } from "../db/data-source.js";
import { TodosSchema } from "../schemas/todos.schema.js";
import { createErrorResponse } from "../error-handling.js";
import { AppError } from "../middlewares/error.middleware.js";

const todoRepository = AppDataSource.getRepository(TodosSchema);

export const getAllTodos = async (req, res, next) => {
  try {
    const { completed, q, page, limit, sort, order } = req.validatedQuery;

    const queryBuilder = todoRepository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.user", "user");

    if (completed !== undefined) {
      queryBuilder.andWhere("todo.completed = :completed", { completed });
    }

    if (q) {
      queryBuilder.andWhere(
        "(LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.description) LIKE LOWER(:search))",
        { search: `%${q}%` }
      );
    }

    queryBuilder.orderBy(`todo.${sort}`, order.toUpperCase());

    queryBuilder.skip((page - 1) * limit).take(limit);

    const todos = await queryBuilder.getMany();

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);
    next(new AppError("Failed to get todos", 500));
  }
};

export const getTodo = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const todo = await todoRepository.findOne({
      where: { id },
    });

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error getting todo:", error);
    next(new AppError("Failed to get todo", 500));
  }
};

export const addTodo = async (req, res, next) => {
  try {
    const { title, description, userId } = req.validatedBody;
    const newTodo = todoRepository.create({
      title,
      description,
      userId,
      completed: false,
    });

    const savedTodo = await todoRepository.save(newTodo);

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    next(new AppError("Failed to add todo", 500));
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const updateData = req.validatedBody;

    const todo = await todoRepository.findOneBy({ id });

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        todo[key] = updateData[key];
      }
    });

    const savedTodo = await todoRepository.save(todo);

    res.status(200).json(savedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    next(new AppError("Failed to update todo", 500));
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    await todoRepository.delete({ id });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    next(new AppError("Failed to delete todo", 500));
  }
};
