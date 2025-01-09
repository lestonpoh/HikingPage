const Login = () => {
  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="p-12 flex flex-col justify-center gap-6 bg-white rounded-lg w-1/2 shadow-lg">
        <h1 className="font-bold text-2xl">Login</h1>
        <form className="flex flex-col gap-3">
          <input className="input" type="text" placeholder="Username" />
          <input className="input" type="password" placeholder="Password" />
          <button className="button w-1/2">Login</button>
        </form>
        <div className="text-xs flex gap-1">
          <span>Don't have an account?</span>
          <a className="text-blue-400 cursor-pointer">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
