import moment from "moment";
import { CommentDetails } from "../../interface/CommentInterface";

interface Props {
  comment: CommentDetails;
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex gap-3 items-center">
        <p className="font-bold">{comment.username}</p>
        <p className="text-xs text-gray-400">
          {moment(comment.createdAt).format("MMMM DD YYYY, h:mm:ss a")}
        </p>
      </div>
      <p>{comment.description}</p>
    </div>
  );
};

export default Comment;
