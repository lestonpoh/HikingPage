import express from "express";
import {
  uploadFiles,
  multerUploadFiles,
} from "../controllers/uploadController";

const router = express.Router();

router.post("/", multerUploadFiles, uploadFiles);

export default router;
