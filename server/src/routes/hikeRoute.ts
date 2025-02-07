import express from "express";

import {
  addHike,
  deleteHike,
  getHikeDetails,
  getHikes,
  updateHike,
} from "../controllers/hikeController";

const router = express.Router();

router.get("/", getHikes);
router.get("/:name", getHikeDetails);
router.post("/", addHike);
router.put("/:name", updateHike);
router.delete("/:id", deleteHike);

export default router;
