function TodoCard({ id, title, description, completed }) {
  return (
    <div className="bg-gray-700 p-4 rounded-3xl mb-4 text-white items-center justify-center flex flex-col gap-3">
      <h2 className="text-2xl font-medium text-red-400">{title}</h2>
      <p className="text-center">{description}</p>
      <p
        className={`font-medium text-xl ${
          completed ? "text-green-500" : "text-red-500"
        }`}
      >
        {completed ? "Completed" : "Not Completed"}
      </p>
    </div>
  );
}
export default TodoCard;
