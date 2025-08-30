import { users } from "../db/User.js";
import { todos } from "../db/Todo.js";

export const createUser = (req, res) => {
  let newUser = {
    id: (users.length + 1).toString(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(newUser);
  const { password, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
};

export const getAllUser = (req, res) => {
  const usersWithoutPasswords = users.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.status(200).json(usersWithoutPasswords);
};

export const getUserTodo = (req, res) => {
  const userTodos = todos.filter((t) => t.userId === req.params.id);
  res.status(200).json(userTodos);
};
