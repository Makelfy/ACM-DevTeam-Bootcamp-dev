import { AppDataSource } from "../db/data-source.js";
import { TodosSchema } from "../db/schemas/todos.schema.js";

const todoRepository = AppDataSource.getRepository(TodosSchema);

export const getAllTodosService = async (queryParams, userId) => {
  const {
    completed,
    q,
    page = 1,
    limit = 10,
    sort = "id",
    order = "ASC",
  } = queryParams;

  if (q) {
    const allTodos = await todoRepository.find({
      where: { userId },
    });

    const searchTerm = q.toLowerCase();
    const filteredTodos = allTodos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm)
    );

    filteredTodos.sort((a, b) => {
      if (order.toUpperCase() === "ASC") {
        return a[sort] > b[sort] ? 1 : -1;
      } else {
        return a[sort] < b[sort] ? 1 : -1;
      }
    });

    const startIndex = (page - 1) * limit;
    return filteredTodos.slice(startIndex, startIndex + limit);
  }

  return await todoRepository.find({
    where: completed !== undefined ? { completed } : {},
    order: {
      [sort]: order.toUpperCase(),
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export const getTodoService = async (id, userId) => {
  const todo = await todoRepository.findOne({ where: { id } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  if (todo.userId !== userId) {
    throw new Error("Unauthorized access to this todo");
  }
  return todo;
};

export const addTodoService = async (todoData, userId) => {
  const { title, description } = todoData;
  const newTodo = todoRepository.create({
    title,
    description,
    userId,
    completed: false,
  });
  return await todoRepository.save(newTodo);
};

export const updateTodoService = async (id, userId, updateData) => {
  const todo = await todoRepository.findOneBy({ id });
  if (!todo) {
    throw new Error("Todo not found");
  }
  if (todo.userId !== userId) {
    throw new Error("Unauthorized access to this todo");
  }

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] !== undefined) {
      todo[key] = updateData[key];
    }
  });

  return await todoRepository.save(todo);
};

export const deleteTodoService = async (id, userId) => {
  const todo = await todoRepository.findOneBy({ id });
  if (!todo) {
    throw new Error("Todo not found");
  }
  if (todo.userId !== userId) {
    throw new Error("Unauthorized access to this todo");
  }
  await todoRepository.delete({ id });

  return true;
};
