import { useState } from "react";
import PostComment from "./PostComment";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import moment from "moment";

interface CommentDetails {
  id: number;
  username: string;
  description: string;
  createdAt: string;
}

interface MainCommentDetails extends CommentDetails {
  replies: CommentDetails[];
}

interface Props {
  id: number;
}

const Comments = ({ id }: Props) => {
  const { isPending, error, data } = useQuery<MainCommentDetails[]>({
    queryKey: ["comments", id],
    queryFn: () =>
      axiosInstance
        .get("/comment", { params: { id } })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        }),
  });

  const [replyIndex, setReplyIndex] = useState(-1);

  return (
    <div className="max-w-screen-lg mx-auto mt-12 px-2">
      <h3 className="font-bold text-4xl pb-2">COMMENTS</h3>

      <div className="mt-2 mb-14 flex flex-col gap-4">
        <div className="">
          <ul>
            {data?.map((comment, i) => (
              <li key={i} className="py-2 border-b border-gray-200">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <p className="font-bold">{comment.username}</p>
                    <p className="text-xs text-gray-400">
                      {moment(comment.createdAt).format(
                        "MMMM DD YYYY, h:mm:ss a"
                      )}
                    </p>
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
