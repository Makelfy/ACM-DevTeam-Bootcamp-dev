import { UsersSchema } from "../schemas/users.schema.js";
import { TodosSchema } from "../schemas/todos.schema.js";

import { AppDataSource } from "../db/data-source.js";
import { createErrorResponse } from "../error-handling.js";
import { AppError } from "../middlewares/error.middleware.js";

const userRepository = AppDataSource.getRepository(UsersSchema);
const todoRepository = AppDataSource.getRepository(TodosSchema);

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.validatedBody;

    const newUser = userRepository.create({ username, email, password });

    const savedUser = await userRepository.save(newUser);

    const userWithoutPassword = getUserWithoutPassword(savedUser);

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    next(new AppError("Failed to create user", 500));
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await userRepository.find();

    const usersWithoutPasswords = users.map((user) => {
      return getUserWithoutPassword(user);
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.error("Error getting users:", error);
    next(new AppError("Failed to get users", 500));
  }
};

export const getUserTodo = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const userTodos = await todoRepository.find({
      where: { userId: id },
    });
    res.status(200).json(userTodos);
  } catch (error) {
    console.error("Error getting user todos:", error);
    next(new AppError("Failed to get user todos", 500));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    await userRepository.delete({ id });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    next(new AppError("Failed to delete user", 500));
  }
};

export function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
