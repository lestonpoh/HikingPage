import { Link, useNavigate } from "react-router-dom";
import SectionItem from "../components/SectionItem";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e: any) => {
    e.preventDefault();
    login();
    navigate("/");
  };
  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="p-12 flex flex-col justify-center gap-6 bg-white rounded-lg w-96 max-w-[90%] shadow-lg">
        <h1 className="font-bold text-3xl">Login</h1>
        <form className="flex flex-col gap-3">
          <SectionItem
            label="Email"
            body={<input className="input" type="text" placeholder="Email" />}
          />
          <SectionItem
            label="Username"
            body={
              <input className="input" type="text" placeholder="Username" />
            }
          />
          <SectionItem
            label="Password"
            body={
              <input className="input" type="password" placeholder="Password" />
            }
          />
          <button onClick={handleLogin} className="button w-1/2 mt-1">
            Login
          </button>
        </form>
        <div className="text-xs flex gap-1">
          <span>Don't have an account?</span>
          <Link to="/register" className="text-blue-400 cursor-pointer">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
