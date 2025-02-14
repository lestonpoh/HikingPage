import { useState } from "react";
import PostComment from "./PostComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

import { MainCommentDetails } from "../../interface/CommentInterface";
import MainComment from "./MainComment";

interface Props {
  id?: number;
}

interface PostCommentInput {
  hikeId: number;
  description: string;
}

const Comments = ({ id }: Props) => {
  const { isPending, data } = useQuery<MainCommentDetails[]>({
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
    enabled: !!id,
  });

  const [replyIndex, setReplyIndex] = useState<number>();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment: PostCommentInput) => {
      return axiosInstance.post("/comment", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const postComment = (comment: string) => {
    if (comment.length === 0) {
      alert("error");
    }
    mutation.mutate({ hikeId: id as number, description: comment });
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-12 px-2">
      <h3 className="font-bold text-4xl pb-2">COMMENTS</h3>
      {isPending ? (
        <div>Loading</div>
      ) : (
        <div className="mt-2 mb-14 flex flex-col gap-4">
          {data && data.length > 0 && (
            <ul>
              {data.map((comment, i) => (
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
      )}
    </div>
  );
};

export default Comments;
