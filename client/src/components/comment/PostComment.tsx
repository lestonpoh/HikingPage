import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

interface Props {
  postComment: (comment: string) => void;
  isReply: boolean;
}

const PostComment = ({ postComment, isReply }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState<string>("");

  const postCommentOnClick = () => {
    postComment(comment);
    setComment("");
  };

  return currentUser ? (
    <div className="w-full flex flex-col gap-3">
      <textarea
        className="input h-auto resize-none "
        rows={3}
        placeholder={isReply ? "Enter reply" : "Enter comment"}
        value={comment}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
      />

      <div className="text-right">
        <button onClick={postCommentOnClick} className="button">
          {isReply ? "Post reply" : "Post comment"}
        </button>
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
