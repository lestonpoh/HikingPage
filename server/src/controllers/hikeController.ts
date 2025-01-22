import { Request, Response } from "express";
import { db } from "../connect";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";
import { body, validationResult } from "express-validator";
dotenv.config();

export const getHikes = (req: Request, res: Response) => {
  const q =
    "SELECT id, name, location, elevation ,difficulty, duration FROM hike ORDER BY createdAt DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getHikeDetails = (req: Request, res: Response) => {
  const q =
    "SELECT id,name, description, location, elevation, difficulty, duration FROM hike WHERE REPLACE(LOWER(name), ' ', '-') = (?)";
  db.query(q, [req.params.name], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// // ADD POST
// const validateAddPost = [
//   body("description").notEmpty().isLength({ max: 2000 }),
//   body("location").notEmpty().isLength({ max: 100 }),
//   body("elevation").notEmpty().isInt({ min: 0 }),
//   body("difficulty").notEmpty().isInt({ min: 0, max: 10 }),
//   body("duration").notEmpty().isFloat({ min: 0 }),
// ];

// export const addPost = [
//   ...validateAddPost,
//   (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//       return;
//     }

//     const token = req.cookies.accessToken;
//     if (!token) {
//       res.status(401).json("Not logged in!");
//       return;
//     }

//     jwt.verify(
//       token,
//       process.env.JWT_SECRET as string,
//       (err: any, userInfo: any) => {
//         if (err) return res.status(403).json("Token not valid");

//         const q =
//           "INSERT INTO post (`userId`,`description`, `location`, `elevation`, `difficulty`, `duration`,`createdAt`) VALUES (?)";

//         const values = [
//           userInfo.id,
//           req.body.description,
//           req.body.location,
//           req.body.elevation,
//           req.body.difficulty,
//           req.body.duration,
//           moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//         ];
//         db.query(q, [values], (err, data) => {
//           if (err) return res.status(500).json(err);

//           return res.status(200).json("Post has been created");
//         });
//       }
//     );
//   },
// ];
