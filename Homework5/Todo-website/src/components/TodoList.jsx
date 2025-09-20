import { useState } from "react";
import TodoCard from "./TodoCard";

function TodoList({ todos }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div>
        {todos.slice(0, showMore ? todos.length : 6).map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
          />
        ))}
      </div>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </>
  );
}
export default TodoList;
