import { db } from "../connect";
import { Request, Response } from "express";
import { query, validationResult } from "express-validator";

const validateGetComments = [query("id").notEmpty().isInt()];

export const getComments = [
  ...validateGetComments,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const q =
      "SELECT c.id, c.description, c.createdAt, u.username, u.profilePic FROM comment as c JOIN user as u ON c.userId = u.id WHERE c.hikeId = (?) ORDER BY c.createdAt DESC";
    db.query(q, [req.query.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  },
];
