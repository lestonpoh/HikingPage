import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";

const LayoutNew = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />
      <div className="dark:bg-slate-500 min-h-full">
        <Outlet />
        {/* <div className="max-w-screen-lg mx-auto p-5 md:p-11">
          
        </div> */}
      </div>
    </div>
  );
};

export default LayoutNew;
