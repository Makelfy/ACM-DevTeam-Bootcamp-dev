import Layout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import AuthPage from "./pages/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { todosLoader } from "./loaders/todosLoader";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/todos",
          element: <TodoPage />,
          loader: todosLoader,
        },
        {
          path: "/login",
          element: <AuthPage />,
        },
        {
          path: "/signup",
          element: <AuthPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
