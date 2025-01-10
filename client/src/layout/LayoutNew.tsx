import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";

const LayoutNew = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LayoutNew;
