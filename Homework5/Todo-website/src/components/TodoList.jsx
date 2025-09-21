import { useState } from "react";
import TodoCard from "./TodoCard";

function TodoList({ todos, filter, header }) {
  const [showMore, setShowMore] = useState(false);

  if (filter) {
    todos = todos.filter(filter);
  }

  return (
    <>
      <h1>{header}</h1>

      <div className="mx-5 grid grid-cols-3 gap-6">
        {todos.slice(0, showMore ? todos.length : 3).map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
          />
        ))}
      </div>
      <button
        className="bg-blue-950 text-white rounded-full px-6 py-2 mt-6 hover:bg-blue-700 transition"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </>
  );
}
export default TodoList;
