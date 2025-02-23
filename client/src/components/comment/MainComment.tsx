import { MainCommentDetails } from "../../interface/CommentInterface";
import PostComment from "./PostComment";
import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

interface Props {
  comment: MainCommentDetails;
  showReplyInput: boolean;
  replyOnClick: () => void;
  hideReplyInput: () => void;
}

interface PostReplyInput {
  commentId: number;
  description: string;
}

const MainComment = ({
  comment,
  showReplyInput,
  replyOnClick,
  hideReplyInput,
}: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment: PostReplyInput) => {
      return axiosInstance.post("/reply", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hikeDetails"] });
      hideReplyInput();
    },
  });

  const postReply = (newComment: string) => {
    if (newComment.length === 0) {
      alert("error");
    }
    mutation.mutate({
      commentId: comment.id as number,
      description: newComment,
    });
  };

  return (
    <div>
      <div className="border-b border-gray-200 py-2">
        <Comment comment={comment} />
        <div className="mt-1">
          {showReplyInput ? (
            <PostComment postComment={postReply} isReply={true} />
          ) : (
            <a
              onClick={() => replyOnClick()}
              className="cursor-pointer text-blue-400 hover:text-blue-500 text-sm"
            >
              Reply
            </a>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <ul className="pl-7">
          {comment.replies.map((reply, i) => (
            <li key={i} className="border-b border-gray-200 py-2">
              <Comment comment={reply}></Comment>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainComment;
