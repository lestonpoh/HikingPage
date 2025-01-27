import express from "express";
import { getPosts, addPost } from "../controllers/post";

const router = express.Router();

router.get("/", getPosts);

export default router;
