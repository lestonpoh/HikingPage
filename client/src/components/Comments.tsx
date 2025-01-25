import { useState } from "react";
import PostComment from "./PostComment";

interface CommentDetails {
  id: number;
  username: string;
  description: string;
  date: string;
}

interface MainCommentDetails extends CommentDetails {
  replies: CommentDetails[];
}

const Comments = () => {
  const [replyIndex, setReplyIndex] = useState(-1);
  const [comments, setComments] = useState<MainCommentDetails[]>([
    {
      id: 1,
      username: "Leston",
      description: "jkdowngiowowjg",
      date: "2023/3/4",
      replies: [],
    },
    {
      id: 1,
      username: "Leston",
      description: "jkdowngiowowjg",
      date: "2023/3/4",
      replies: [],
    },
    {
      id: 1,
      username: "Leston",
      description: "jkdowngiowowjg",
      date: "2023/3/4",
      replies: [],
    },
  ]);
  return (
    <div className="max-w-screen-lg mx-auto mt-12 px-2">
      <h3 className="font-bold text-4xl pb-2">COMMENTS</h3>

      <div className="mt-2 mb-14 flex flex-col gap-4">
        <div className="">
          <ul>
            {comments.map((comment, i) => (
              <li className="py-2 border-b border-gray-200">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <p className="font-bold">{comment.username}</p>
                    <p className="text-xs text-gray-400">{comment.date}</p>
                  </div>
                  <p>{comment.description}</p>
                  {i == replyIndex ? (
                    <PostComment />
                  ) : (
                    <a
                      onClick={() => {
                        setReplyIndex(i);
                      }}
                      className="cursor-pointer text-blue-400 hover:text-blue-500 text-sm"
                    >
                      Reply
                    </a>
                  )}
                </div>
                {i == replyIndex && <div className="mt-2"></div>}
              </li>
            ))}
          </ul>
        </div>

        {replyIndex == -1 ? (
          <PostComment />
        ) : (
          <a
            onClick={() => {
              setReplyIndex(-1);
            }}
            className="cursor-pointer text-blue-400 hover:text-blue-500 text-sm"
          >
            Leave a comment
          </a>
        )}
      </div>
    </div>
  );
};

export default Comments;
