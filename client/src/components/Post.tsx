import {
  MoreHoriz,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  TextsmsOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import PostDetails from "../interface/PostDetails";
import { useState } from "react";
import Comments from "./Comments";

interface Props {
  post: PostDetails;
}

const Post = ({ post }: Props) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const navigate = useNavigate();
  const liked = false;

  const postOnClick = () => {
    navigate("./hikes/name");
  };

  return (
    <div
      key={post.id}
      onClick={postOnClick}
      className=" cursor-pointer p-5 flex flex-col gap-5 rounded-3xl shadow-md bg-white "
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src={post.profilePic}
            alt="Profile picture"
            className="w-10 h-10 rounded-full object-cover"
          />
          <Link
            to={`/profile/${post.username}`}
            className="font-bold text-l cursor-pointer"
          >
            {post.username}
          </Link>
        </div>
        <div>
          <MoreHoriz />
        </div>
      </div>
      <div className="flex gap-1 text-xs px-3 py-2 rounded bg-gray-200">
        <div className="flex-1 font-bold">Elevation: {post.elevation}m</div>
        <div className="flex-1 font-bold">Difficulty: {post.difficulty}/10</div>
        <div className="flex-1 font-bold">Duration: {post.duration} h</div>
      </div>
      <div>
        <div className="hidden md:block">{post.description}</div>
        <div className="h-[25rem] w-[25rem]">
          <img
            src={post.profilePic}
            alt="Post Image"
            className="w-full max-h-[30rem] object-cover mt-3"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 text-xs">
          {liked ? (
            <FavoriteOutlined className="cursor-pointer" />
          ) : (
            <FavoriteBorderOutlined className="cursor-pointer" />
          )}
          12 Likes
        </div>
        <div
          onClick={() => setCommentOpen(!commentOpen)}
          className="flex items-center gap-1 text-xs cursor-pointer"
        >
          <TextsmsOutlined />
          10 Comments
        </div>
        <div className="flex items-center gap-1 text-xs">
          <ShareOutlined className="cursor-pointer" />
          Share
        </div>
      </div>
      {commentOpen && <Comments />}
    </div>
  );
};

export default Post;
