import { db } from "../connect";
import { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
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

interface SQLCommentsOutput {
  comment_id: number;
  comment_description: string;
  comment_createdAt: string;
  comment_username: string;
  reply_id: number;
  reply_description: string;
  reply_createdAt: string;
  reply_username: string;
}

// get comments

const validateGetComments = [query("id").notEmpty().isInt()];

export const getComments = [
  ...validateGetComments,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const q = `SELECT comment.id as comment_id, comment.description as comment_description, comment.createdAt as comment_createdAt, user.username as comment_username, reply.id as reply_id, reply.description as reply_description, reply.createdAt as reply_createdAt, user_reply.username as reply_username FROM comment
        JOIN user ON comment.userId = user.id
        LEFT JOIN reply ON comment.id = reply.commentId
        LEFT JOIN user as user_reply ON reply.userId = user_reply.id
        WHERE comment.hikeId = (?)
        ORDER BY comment.createdAt DESC, reply.createdAt DESC`;
    db.query(q, [req.query.id], (err, data: SQLCommentsOutput[]) => {
      if (err) return res.status(500).json(err);

      const comments: MainCommentDetails[] = [];

      data.forEach((row) => {
        let comment = comments.find((comment) => comment.id === row.comment_id);

        if (!comment) {
          comment = {
            id: row.comment_id,
            username: row.comment_username,
            description: row.comment_description,
            createdAt: row.comment_createdAt,
            replies: [],
          };
          comments.push(comment);
        }

        if (row.reply_id) {
          comment.replies.push({
            id: row.reply_id,
            username: row.reply_username,
            description: row.reply_description,
            createdAt: row.reply_createdAt,
          });
        }
      });

      return res.status(200).json(comments);
    });
  },
];

// add comment
const validateAddComment = [
  body("hikeId").notEmpty().isInt(),
  body("description").notEmpty().isLength({ max: 1000 }),
];

export const addComment = [
  ...validateAddComment,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const token = req.cookies.accessToken;
    if (!token) {
      res.status(401).json("Not logged in!");
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, userInfo: any) => {
        if (err) return res.status(403).json("Token not valid");

        const q =
          "INSERT INTO comment (`hikeId`,`userId`,`description`,`createdAt`) VALUES (?)";
        const values = [
          req.body.hikeId,
          userInfo.id,
          req.body.description,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Comment has been created");
        });
      }
    );
  },
];
