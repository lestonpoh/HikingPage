"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hikeController_1 = require("../controllers/hikeController");
const router = express_1.default.Router();
router.get("/", hikeController_1.getHikes);
router.get("/:name", hikeController_1.getHikeDetails);
router.post("/", hikeController_1.addHike);
router.put("/:name", hikeController_1.updateHike);
router.delete("/:id", hikeController_1.deleteHike);
exports.default = router;
