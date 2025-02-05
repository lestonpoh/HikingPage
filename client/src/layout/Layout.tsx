import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="dark:bg-slate-500 min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
