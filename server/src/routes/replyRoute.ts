import express from "express";
import { addReply } from "../controllers/replyController";

const router = express.Router();

router.post("/", addReply);

export default router;
