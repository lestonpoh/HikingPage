import {
  MoreHoriz,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  TextsmsOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import PostDetails from "../interface/PostDetails";
import { useState } from "react";
import Comments from "./comments";

interface Props {
  post: PostDetails;
}

const Post = ({ post }: Props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  // temp
  const liked = false;

  return (
    <div
      key={post.id}
      className="p-5 flex flex-col gap-5 rounded-3xl shadow-md bg-white dark:bg-slate-700 dark:text-white "
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src={post.profilePic}
            alt="Profile picture"
            className="w-10 h-10 rounded-full object-cover"
          />
          <Link
            to={`/profile/${post.userId}`}
            className="font-bold text-xl cursor-pointer"
          >
            {post.name}
          </Link>
        </div>
        <div>
          <MoreHoriz />
        </div>
      </div>
      <div>
        <div>{post.description}</div>
        <img
          src={post.profilePic}
          alt="Post Image"
          className="w-full max-h-[30rem] object-cover mt-3"
        />
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
