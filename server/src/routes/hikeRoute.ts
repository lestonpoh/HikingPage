import express from "express";

import { getHikeDetails, getHikes } from "../controllers/hikeController";

const router = express.Router();

router.get("/", getHikes);
router.get("/:name", getHikeDetails);
// router.post("/", addPost);

export default router;
