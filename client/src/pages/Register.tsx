import { Link } from "react-router-dom";
import SectionItem from "../components/SectionItem";

const Register = () => {
  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="p-12 flex flex-col justify-center gap-6 bg-white rounded-lg w-96 max-w-[90%] shadow-lg">
        <h1 className="font-bold text-3xl">Register</h1>
        <form className="flex flex-col gap-3">
          <SectionItem
            label="Email"
            body={<input className="input" type="text" placeholder="Email" />}
          />
          <SectionItem
            label="Password"
            body={
              <input className="input" type="password" placeholder="Password" />
            }
          />
          <SectionItem
            label="Confirm password"
            body={
              <input className="input" type="password" placeholder="Password" />
            }
          />
          <button className="button w-1/2 mt-1">Register</button>
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
