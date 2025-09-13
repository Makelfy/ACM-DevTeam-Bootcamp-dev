import { AppDataSource } from "../db/data-source.js";
import { UsersSchema } from "../schemas/users.schema.js";
import { TodosSchema } from "../schemas/todos.schema.js";
import z from "zod";

const userRepository = AppDataSource.getRepository(UsersSchema);
const todoRepository = AppDataSource.getRepository(TodosSchema);

// Zod validation schema
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (validatedData.body) {
        req.validatedBody = validatedData.body;
      }

      if (validatedData.params) {
        req.validatedParams = validatedData.params;
      }

      if (validatedData.query) {
        req.validatedQuery = validatedData.query;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      console.error("Non-Zod error:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };
};

// User Validations
export const validateUserId = async (req, res, next) => {
  const { id } = req.validatedParams;
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  next();
};

export const validateUserCreate = async (req, res, next) => {
  const { email, username } = req.validatedBody;
  const existingUser = await userRepository.findOne({
    where: [{ email }, { username }],
  });
  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
      message:
        existingUser.email === email
          ? "Email already registered"
          : "Username already taken",
    });
  }
  next();
};

// Todo validations
export const validateTodoCreate = async (req, res, next) => {
  const user = await userRepository.findOneBy({ id: req.validatedBody.userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  next();
};
export const validateTodoId = async (req, res, next) => {
  const todo = await todoRepository.findOneBy({ id: req.validatedParams.id });
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  next();
};
