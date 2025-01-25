import { useContext } from "react";
import SectionItem from "./SectionItem";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const PostComment = () => {
  const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return currentUser ? (
    <div className="w-full flex flex-col gap-3">
      <SectionItem
        label=""
        body={
          <textarea
            className="input h-auto resize-none "
            rows={3}
            placeholder="Enter comment"
          />
        }
      />
      <div className="text-right">
        <button className="button">Post comment</button>
      </div>
    </div>
  ) : (
    <div className="text-xs flex gap-1">
      <Link to="/login" className="text-blue-400 cursor-pointer">
        Log in
      </Link>
      <span> to post a comment.</span>
    </div>
  );
};

export default PostComment;
