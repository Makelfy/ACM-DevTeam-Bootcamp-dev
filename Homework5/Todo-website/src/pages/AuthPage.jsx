import { useLocation } from "react-router-dom";

function AuthPage() {
  const location = useLocation();
  const currentRoute = location.pathname;

  if (currentRoute === "/login") {
    return (
      <div className="flex flex-col gap-12 items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold ">Login Page</h1>
        <form className="flex flex-col gap-4 items-start">
          <div className="w-full flex ">
            <label
              htmlFor="username"
              className="pr-2 font-medium text-xl text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="rounded-xl px-2 w-full"
            />
          </div>
          <div className="w-full flex ">
            <label
              htmlFor="password"
              className="pr-2 font-medium text-xl text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="rounded-xl px-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white text-xl font-semibold 
            px-4 py-2 rounded-full self-center cursor-pointer mt-4 hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  } else if (currentRoute === "/signup") {
    return (
      <div className="flex flex-col gap-12 items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold ">Sign Up Page</h1>
        <form className="flex flex-col gap-4 items-start">
          <div className="w-full flex ">
            <label
              htmlFor="username"
              className="pr-2 font-medium text-xl text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="rounded-xl px-2 w-full"
            />
          </div>

          <div className="w-full flex ">
            <label
              htmlFor="email"
              className="pr-2 font-medium text-xl text-white"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="rounded-xl px-2 w-full"
            />
          </div>

          <div className="w-full flex ">
            <label
              htmlFor="password"
              className="pr-2 font-medium text-xl text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="rounded-xl px-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white text-xl font-semibold 
            px-4 py-2 rounded-full self-center cursor-pointer mt-4 hover:bg-purple-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
export default AuthPage;
