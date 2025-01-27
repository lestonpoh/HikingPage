import multer from "multer";
import { Request, Response } from "express";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const multerUploadFiles = upload.array("files");

export const uploadFiles = (req: Request, res: Response) => {
  const files = req.files;
  res.status(200).json(files);
};
