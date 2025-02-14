import { dbConnection } from "../connect";
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
  async (req: Request, res: Response) => {
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

    try {
      const db = await dbConnection;
      const userInfo: any = await jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );

      const insertReplyQuery =
        "INSERT INTO reply (`commentId`,`userId`,`description`,`createdAt`) VALUES (?,?,?,?)";

      const values = [
        req.body.commentId,
        userInfo.id,
        req.body.description,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      db.execute(insertReplyQuery, values);

      res.status(200).json("Reply has been created");
      return;
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        res.status(403).json("Token not valid");
        return;
      } else {
        res.status(500).json(err);
        return;
      }
    }
  },
];
