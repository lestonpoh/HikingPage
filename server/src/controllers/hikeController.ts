import { NextFunction, Request, Response } from "express";
import { db } from "../connect";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";
import { body, validationResult } from "express-validator";
import { uploadMultipleFiles } from "../utils/uploadMultipleFiles";
import fs from "fs";

dotenv.config();

interface RequestCustom extends Request {
  userInfo?: any;
}

interface SQLHikeOutput {
  id: number;
  name: string;
  description: string;
  location: string;
  elevation: number;
  difficulty: number;
  duration: number;
  fileName: string;
}

export const getHikes = (req: Request, res: Response) => {
  const q =
    "SELECT hike.id, name, location, elevation ,difficulty, duration, fileName FROM hike LEFT JOIN photo ON hike.id = photo.hikeId AND photo.isCover = true ORDER BY createdAt DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getHikeDetails = (req: Request, res: Response) => {
  const q =
    "SELECT hike.id, name, description, location, elevation, difficulty, duration, fileName FROM hike LEFT JOIN photo ON hike.id = photo.hikeId AND photo.isCover = true WHERE REPLACE(LOWER(name), ' ', '-') = (?)";
  db.query(q, [req.params.name], (err, data: SQLHikeOutput[]) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) return res.status(404).json("Not Found");

    const output = {
      id: data[0].id,
      name: data[0].name,
      description: data[0].description,
      location: data[0].location,
      elevation: data[0].elevation,
      difficulty: data[0].difficulty,
      duration: data[0].duration,
      files: [] as String[],
    };

    data.forEach((row) => {
      if (row.fileName) {
        output.files.push(row.fileName);
      }
    });

    return res.status(200).json(output);
  });
};

// ADD POST
const validateAddHike = [
  body("name").notEmpty(),
  body("description").notEmpty().isLength({ max: 2000 }),
  body("location").notEmpty().isLength({ max: 100 }),
  body("elevation").notEmpty().isInt({ min: 0 }),
  body("difficulty").notEmpty().isInt({ min: 0, max: 10 }),
  body("duration").notEmpty().isFloat({ min: 0 }),
];

export const addHike = [
  (req: RequestCustom, res: Response, next: NextFunction) => {
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

        req.userInfo = userInfo;
        next();
      }
    );
  },
  uploadMultipleFiles,
  ...validateAddHike,
  (req: RequestCustom, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const files = req.files as Express.Multer.File[];

      if (files) {
        files.forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err)
              console.error("Failed to delete file on validation failure", err);
          });
        });
      }

      res.status(400).json({ errors: errors.array() });
      return;
    }

    const checkHikeNameQuery = "SELECT id FROM hike WHERE hike.name = (?)";

    db.query(checkHikeNameQuery, [req.body.name], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) {
        return res.status(409).json("Name already exist!");
      }

      const q =
        "INSERT INTO hike (`userId`,`name`,`description`, `location`, `elevation`, `difficulty`, `duration`,`createdAt`) VALUES (?)";

      const values = [
        req.userInfo.id,
        req.body.name,
        req.body.description,
        req.body.location,
        req.body.elevation,
        req.body.difficulty,
        req.body.duration,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        const hikeId = data.insertId;

        if (!req.files || req.files.length === 0) {
          return res.status(200).json("Hike has been created with no files");
        }

        const files = req.files as Express.Multer.File[];

        const fileNames = files.map((file) => file.filename);

        fileNames.forEach((fileName) => {
          const q = "INSERT INTO photo (`hikeId`,`filePath`) VALUES (?)";

          const values = [hikeId, fileName];
          db.query(q, [values], (err) => {
            if (err) return res.status(500).json(err);
          });
        });

        return res.status(200).json("Hike has been created with files");
      });
    });
  },
];
