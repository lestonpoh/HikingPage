import { db } from "../connect";
import { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import moment from "moment";

// add comment
const validateAddReply = [
  body("commentId").notEmpty().isInt(),
  body("description").notEmpty().isLength({ max: 1000 }),
];

export const addReply = [
  ...validateAddReply,
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
          "INSERT INTO reply (`commentId`,`userId`,`description`,`createdAt`) VALUES (?)";
        const values = [
          req.body.commentId,
          userInfo.id,
          req.body.description,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Reply has been created");
        });
      }
    );
  },
];
