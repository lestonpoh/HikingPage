import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";

const Home = () => {
  const navigate = useNavigate();

  const addPostOnClick = () => {
    navigate("/addEditPost");
  };

  return (
    <>
      <Posts />
      <button
        onClick={addPostOnClick}
        className="button fixed bottom-6 right-6"
      >
        Add Post
      </button>
    </>
  );
};

export default Home;
