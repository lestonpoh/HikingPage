import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useContext } from "react";
// import { DarkModeContext } from "../context/darkModeContext";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  // const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white flex items-center justify-between gap-7 px-5 py-2 border-b border-slate-200 shadow-sm sticky top-0">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold">
          HikeSocial
        </Link>
        {/* {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className="cursor-pointer" />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="cursor-pointer" />
        )} */}
      </div>
      <div className="flex-1 flex justify-center">
        <div className="max-w-2xl w-full">
          <Link to="/hike">Hike</Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img
          className="w-8 rounded-full"
          src={"https://picsum.photos/200"}
          alt="user profile image"
        />
        <div className="flex flex-col">
          <Link
            to={`/profile/${currentUser?.username}`}
            className="font-bold w-full leading-5"
          >
            {currentUser?.username}
          </Link>
          <a
            className="text-xs font-bold text-sky-500 cursor-pointer leading-3 ml-auto"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
