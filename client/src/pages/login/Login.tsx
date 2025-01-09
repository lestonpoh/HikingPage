const Login = () => {
  return (
    <div className="h-screen bg-sky-300 flex items-center justify-center">
      <div className="flex bg-white w-1/2 h-1/2 rounded-xl overflow-hidden">
        <div className="flex-1 bg-[url('')] px-12 py-32 flex flex-col bg-slate-300">
          <h1 className="text-5xl font-bold mb-8">WELCOME</h1>
          <span>Don't have an account?</span>
          <button className="button w-1/2 mt-4">Register</button>
        </div>
        <div className="flex-1 p-12 flex flex-col justify-center gap-6">
          <h1 className="font-bold text-2xl">Login</h1>
          <form className="flex flex-col gap-4">
            <input className="input" type="text" placeholder="Username" />
            <input className="input" type="password" placeholder="Password" />
            <button className="button w-1/2">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
