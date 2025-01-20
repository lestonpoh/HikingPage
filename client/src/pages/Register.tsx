import { Link } from "react-router-dom";
import SectionItem from "../components/SectionItem";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import axiosInstance from "../services/axiosInstance";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [error, SetError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      inputs.username === "" ||
      inputs.email === "" ||
      inputs.password === "" ||
      inputs.confirmPassword === ""
    ) {
      // add ui
      console.log("not all fields filled");
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      // do some ui stuff next time
      console.log("password dont match");
      return;
    }

    const { confirmPassword, ...registerInputs } = inputs;

    axiosInstance
      .post("/auth/register", registerInputs)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    // try {
    //   await axiosInstance.post("/auth/register", registerInputs);
    // } catch (err: any) {
    //   if (err.response.status === 400) {
    //     console.log("400");
    //   }
    //   if (err.response.data === "User already exist") {
    //   } else {
    //     console.log(err.response.data);
    //   }
    // }
  };

  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="p-12 flex flex-col justify-center gap-6 bg-white rounded-lg w-96 max-w-[90%] shadow-lg">
        <h1 className="font-bold text-3xl">Register</h1>
        <form className="flex flex-col gap-4">
          <SectionItem
            label="Username*"
            body={
              <Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
            }
          />
          <SectionItem
            label="Email*"
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
            label="Password*"
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
          <SectionItem
            label="Confirm password*"
            body={
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="confirmPassword"
                onChange={handleChange}
              />
            }
          />
          <button onClick={registerOnClick} className="button w-1/2 mt-1">
            Register
          </button>
        </form>
        <div className="text-xs flex gap-1">
          <span>Have an account?</span>
          <span>Click </span>
          <Link to="/login" className="text-blue-400 cursor-pointer">
            here
          </Link>
          <span> to login.</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
