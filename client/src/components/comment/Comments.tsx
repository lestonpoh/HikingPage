import { useState } from "react";
import PostComment from "./PostComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

import { MainCommentDetails } from "../../interface/CommentInterface";
import MainComment from "./MainComment";

interface Props {
  hikeId: number;
  comments: MainCommentDetails[];
}

interface PostCommentInput {
  hikeId: number;
  description: string;
}

const Comments = ({ hikeId, comments }: Props) => {
  const [replyIndex, setReplyIndex] = useState<number>();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment: PostCommentInput) => {
      return axiosInstance.post("/comment", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hikeDetails"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const postComment = (comment: string) => {
    if (comment.length === 0) {
      alert("error");
    }
    mutation.mutate({ hikeId: hikeId, description: comment });
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-12 px-2">
      <h3 className="font-bold text-4xl pb-2">COMMENTS</h3>
      {comments && comments.length > 0 && (
        <div className="mt-2 mb-14 flex flex-col gap-4">
          <ul>
            {comments.map((comment, i) => (
              <li key={i}>
                <MainComment
                  comment={comment}
                  showReplyInput={replyIndex === i}
                  replyOnClick={() => setReplyIndex(i)}
                  hideReplyInput={() => {
                    setReplyIndex(-1);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {replyIndex == -1 ? (
        <PostComment postComment={postComment} isReply={false} />
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
  );
};

export default Comments;
