import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="bg-gray-500 min-h-screen ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
export default AppLayout;
