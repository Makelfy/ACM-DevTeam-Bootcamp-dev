import z from "zod";

export const todoTitleSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 character")
      .max(200, "Title is too long")
      .trim(),
  }),
});

export const todoDescriptionSchema = z.object({
  body: z.object({
    description: z
      .string()
      .min(5, "Description is too short")
      .max(1000, "Description is too long"),
  }),
});

export const todoCompletedSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),
});

export const todoParamsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/)
      .transform((val) => parseInt(val)),
  }),
});

export const createTodoSchema = z.object({
  body: z.object({
    title: todoTitleSchema.shape.body.shape.title,
    description: todoDescriptionSchema.shape.body.shape.description,
    userId: z
      .number()
      .int("User ID must be an integer")
      .positive("User ID must be positive"),
  }),
});

export const updateFullTodoSchema = z.object({
  ...todoTitleSchema,
  ...todoDescriptionSchema,
  ...todoParamsSchema,
  ...todoCompletedSchema,
});

export const updateHalfTodoSchema = z.object({
  params: todoParamsSchema.shape.params,
  body: z
    .object({
      title: todoTitleSchema.shape.body.shape.title.optional(),
      description:
        todoDescriptionSchema.shape.body.shape.description.optional(),
      completed: todoCompletedSchema.shape.body.shape.completed.optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one field must be provided"
    ),
});

export const todoQuerySchema = z.object({
  query: z.object({
    completed: z
      .enum(["true", "false"])
      .transform((val) => val === "true")
      .optional(),

    q: z.string().min(1, "Search querry cannot be empty").optional(),

    page: z
      .string()
      .regex(/^\d+$/, "Page must be a number")
      .transform((val) => Math.max(1, parseInt(val)))
      .default("1"),

    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a number")
      .transform((val) => Math.min(100, Math.max(1, parseInt(val))))
      .default("10"),

    sort: z.enum(["created_at", "updated_at", "title"]).default("created_at"),

    order: z.enum(["asc", "desc"]).default("desc"),
  }),
});
