import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";

const LayoutNew = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />
      <div className="bg-slate-100 dark:bg-slate-500 min-h-full">
        <div className="max-w-screen-lg mx-auto p-5 md:p-11">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutNew;
