import { MainCommentDetails } from "./CommentInterface";

export interface HikeDetail {
  id: number;
  name: string;
  description: string;
  location: string;
  elevation: number;
  difficulty: number;
  duration: number;
  photos: string[];
  comments: MainCommentDetails[];
}
