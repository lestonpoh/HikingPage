import { Link, Navigate } from "react-router-dom";
import SectionItem from "../components/SectionItem";
import { AuthContext } from "../context/authContext";
import { ChangeEvent, useContext, useState } from "react";

const Login = () => {
  // navigate to home if loggedin
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setError(false);

    if (inputs.email === "" || inputs.password === "") {
      // add ui
      console.log("not all fields filled");
      return;
    }

    login(inputs)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="p-12 flex flex-col justify-center gap-6 bg-white rounded-lg w-96 max-w-[90%] shadow-lg">
        <h1 className="font-bold text-3xl">Login</h1>
        <form className="flex flex-col gap-3">
          <SectionItem
            label="Email"
            body={
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            }
          />

          <SectionItem
            label="Password"
            body={
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            }
          />
          {error && (
            <p className="text-red-600 text-xs">Invalid email or password</p>
          )}
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
