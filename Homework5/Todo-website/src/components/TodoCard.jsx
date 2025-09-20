function TodoCard({ id, title, description, completed }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
}
export default TodoCard;
