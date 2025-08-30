import { todos } from "./db/Todo.js";
import { users } from "./db/User.js";

//User Validate
export const validateUserCreate = (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send("Missing fields");
  }
  if (!req.body.email.includes("@")) {
    return res.status(400).send("Invalid email");
  }
  next();
};
export const validateUserId = (req, res, next) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  next();
};

// Todo Validate
export const validateTodoCreate = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = users.find((u) => u.id === req.body.userId);
  if (!title || !description) {
    return res.status(400).json({ message: "Missing part" });
  }
  if (!userId) {
    return res.status(400).json({ message: "Verification Error" });
  }
  next();
};
export const validateTodoFullUpdate = (req, res, next) => {
  const todoId = todos.find((t) => t.id === req.params.id);

  if (!req.body.title || !req.body.description || !req.body.completed) {
    return res.status(400);
  }
  next();
};
export const validateTodoHalfUpdate = (req, res, next) => {
  const todoId = todos.find((t) => t.id === req.params.id);

  if (req.body.title || req.body.description || req.body.completed) {
    next();
  } else {
    return res.status(400);
  }
};
export const validateTodoId = (req, res, next) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  next();
};

export const applyFilters = (todosArray, query) => {
  let filteredTodos = [...todosArray];

  // Filter by completed status
  if (query.completed !== undefined) {
    const isCompleted = query.completed === "true";

    filteredTodos = filteredTodos.filter((t) => {
      return t.completed === isCompleted;
    });
  }

  // Filter by search query
  if (query.q) {
    const searchTerm = query.q.toLowerCase();
    filteredTodos = filteredTodos.filter((todo) => {
      const titleMatch = todo.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = todo.description
        .toLowerCase()
        .includes(searchTerm);
      const matches = titleMatch || descriptionMatch;
      return matches;
    });
  }

  return filteredTodos;
};
