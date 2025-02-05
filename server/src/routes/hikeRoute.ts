import express from "express";

import {
  addHike,
  getHikeDetails,
  getHikes,
  updateHike,
} from "../controllers/hikeController";

const router = express.Router();

router.get("/", getHikes);
router.get("/:name", getHikeDetails);
router.post("/", addHike);
router.put("/:name", updateHike);

export default router;
