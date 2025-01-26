import express from "express";
import { getComments } from "../controllers/commentController";

const router = express.Router();

router.get("/", getComments);

export default router;
