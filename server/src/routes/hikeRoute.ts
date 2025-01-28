import express from "express";

import {
  addHike,
  getHikeDetails,
  getHikes,
} from "../controllers/hikeController";

const router = express.Router();

router.get("/", getHikes);
router.get("/:name", getHikeDetails);
router.post("/", addHike);

export default router;
