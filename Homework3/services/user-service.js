import { UsersSchema } from "../schema/users.schema.js";
import { TodosSchema } from "../schema/todos.schema.js";

import { AppDataSource } from "../db/data-source.js";
import { createErrorResponse } from "../error-handling.js";

const userRepository = AppDataSource.getRepository(UsersSchema);
const todoRepository = AppDataSource.getRepository(TodosSchema);

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.validatedBody;

    const newUser = userRepository.create({ username, email, password });

    const savedUser = await userRepository.save(newUser);

    const userWithoutPassword = getUserWithoutPassword(savedUser);

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    createErrorResponse("Error creating user:", "Failed to create user", error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await userRepository.find();

    const usersWithoutPasswords = users.map((user) => {
      return getUserWithoutPassword(user);
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    createErrorResponse(
      "Error fetching users:",
      "Failed to fetch users",
      error
    );
  }
};

export const getUserTodo = async (req, res) => {
  try {
    const { id } = req.validatedParams;

    const userTodos = await todoRepository.find({
      where: { userId: id },
    });
    res.status(200).json(userTodos);
  } catch (error) {
    createErrorResponse("Error fetching user", "Failed to fetch user", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.validatedParams;

    await userRepository.delete({ id });

    res.status(204).send();
  } catch (error) {
    createErrorResponse("Error deleting user", "Failed to delete user", error);
  }
};

export function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
