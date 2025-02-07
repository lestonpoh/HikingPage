import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white flex items-center justify-between gap-7 px-5  border-b border-slate-200 shadow-sm sticky z-50 top-0">
      <NavLink to="/" className="font-bold text-lg">
        HikingPage
      </NavLink>

      <div className="flex-1">
        <div className="inline-block">
          <NavLink to="/hike">
            {({ isActive }) => (
              <div
                className={`box-border p-4 hover:shadow-[0_1px_0_0_rgba(0,0,0)] ${
                  isActive ? "shadow-[0_1px_0_0_rgba(0,0,0)]" : ""
                }`}
              >
                View all hikes
              </div>
            )}
          </NavLink>
        </div>
      </div>

      {currentUser ? (
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
      ) : (
        <Link
          className="text-xs font-bold text-sky-500 cursor-pointer leading-3 ml-auto"
          to="/login"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
