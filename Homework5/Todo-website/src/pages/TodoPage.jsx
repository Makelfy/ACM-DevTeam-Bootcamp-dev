import { useLoaderData } from "react-router-dom";
import TodoList from "../components/TodoList";

function TodoPage() {
  const todos = useLoaderData();

  return (
    <div className="py-20 flex flex-col items-center justify-center">
      <h1
        className="font-bold text-6xl w-max
      bg-gradient-to-br from-orange-200 to-orange-700 text-transparent bg-clip-text text-center"
      >
        Your Todos
      </h1>
      <p
        className="font-bold text-3xl py-5 w-max
      bg-gradient-to-br from-yellow-400 to-lime-500 text-transparent bg-clip-text text-center"
      >
        You can see your todos here
      </p>
      <TodoList todos={todos} />
    </div>
  );
}
export default TodoPage;
