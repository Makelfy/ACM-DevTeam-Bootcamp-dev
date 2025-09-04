import { AppDataSource } from "./db/data-source.js";
import { TodosSchema } from "./schema/todos.schema.js";
import { UsersSchema } from "./schema/users.schema.js";
import z from "zod";

const todoRepository = AppDataSource.getRepository(TodosSchema);
const userRepository = AppDataSource.getRepository(UsersSchema);

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = validatedData.body || req.body;
      req.params = validatedData.params || req.params;
      req.query = validatedData.query || req.query;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          error: "Validation failed",
          details: errors,
        });
      }
      next(error);
    }
  };
};

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
export const validateUserId = async (req, res, next) => {
  const user = await userRepository.findOneBy({ id: Number(req.params.id) });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  next();
};

// Todo Validate
export const validateTodoCreate = async (req, res, next) => {
  const { title, description } = req.body;

  const user = await userRepository.findOneBy({ id: req.body.userId });

  if (!title || !description) {
    return res.status(400).json({ message: "Missing part" });
  }
  if (!user) {
    return res.status(400).json({ message: "Verification Error" });
  }
  next();
};
export const validateTodoFullUpdate = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    req.body.completed === undefined
  ) {
    return res.status(400).json({ message: "Invalid request" });
  }
  next();
};
export const validateTodoHalfUpdate = async (req, res, next) => {
  if (req.body.title || req.body.description || req.body.completed) {
    next();
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }
};
export const validateTodoId = async (req, res, next) => {
  const todo = await todoRepository.findOneBy({ id: Number(req.params.id) });
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
