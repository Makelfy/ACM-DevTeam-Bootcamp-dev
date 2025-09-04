import { UsersSchema } from "../schema/users.schema.js";
import { TodosSchema } from "../schema/todos.schema.js";

import { AppDataSource } from "../db/data-source.js";

const userRepository = AppDataSource.getRepository(UsersSchema);
const todoRepository = AppDataSource.getRepository(TodosSchema);

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = userRepository.create({ username, email, password });

  const savedUser = await userRepository.save(newUser);

  const { password: _, ...userWithoutPassword } = savedUser;

  res.status(201).json(userWithoutPassword);
};

export const getAllUser = async (req, res) => {
  const users = await userRepository.find({ relations: ["todos"] });

  const usersWithoutPasswords = users.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.status(200).json(usersWithoutPasswords);
};

export const getUserTodo = async (req, res) => {
  const userTodos = await todoRepository.find({
    where: { userId: Number(req.params.id) },
    relations: ["user"],
  });
  res.status(200).json(userTodos);
};

export const deleteUser = async (req, res) => {
  await userRepository.delete({ id: Number(req.params.id) });

  res.status(204);
};
