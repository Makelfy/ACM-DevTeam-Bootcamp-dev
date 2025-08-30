import express from "express";
import userRouter from "./routes/user.js";
import todosRouter from "./routes/todos.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/todos", todosRouter);

app.listen(3000);
