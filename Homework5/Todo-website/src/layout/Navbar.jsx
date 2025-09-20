import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <p className="cursor-pointer">
          <Link to="/">Todo App</Link>
        </p>
        <p className="cursor-pointer">
          <Link to="/">Home</Link>
        </p>
        <p className="cursor-pointer">
          <Link to="/todos">Todos</Link>
        </p>
        <p className="cursor-pointer">
          <Link to="/authpage">Auth Page</Link>
        </p>
        <p className="cursor-pointer">
          <Link to="/login">Log In</Link>
        </p>
        <p className="cursor-pointer">
          <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
