import { useLoaderData } from "react-router-dom";
import TodoList from "../components/TodoList";

function TodoPage() {
  const todos = useLoaderData();

  return (
    <div>
      <h1>Your Todos</h1>
      <p>You can see your todos here</p>
      <TodoList todos={todos} />
    </div>
  );
}
export default TodoPage;
