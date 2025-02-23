export interface CommentDetails {
  id?: number;
  username: string;
  description: string;
  createdAt: string;
}

export interface MainCommentDetails extends CommentDetails {
  replies: CommentDetails[];
}
