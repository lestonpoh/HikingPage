import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-500 min-h-full">
      <div className="max-w-screen-lg mx-auto p-11">
        <Posts />
      </div>
    </div>
  );
};

export default Home;
