import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 py-4 px-8 text-white fixed w-full top-0">
      <div className="flex justify-between gap-8 items-center">
        <p className="cursor-pointer">
          <Link to="/">Todo App</Link>
        </p>

        <div className="flex justify-between gap-16">
          <p className="cursor-pointer">
            <Link to="/">Home</Link>
          </p>
          <p className="cursor-pointer">
            <Link to="/todos">Todos</Link>
          </p>
        </div>

        <div className="flex justify-between gap-8">
          <p className="cursor-pointer">
            <Link to="/login">Log In</Link>
          </p>
          <p className="cursor-pointer">
            <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
