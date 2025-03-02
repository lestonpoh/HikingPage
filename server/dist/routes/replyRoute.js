"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const replyController_1 = require("../controllers/replyController");
const router = express_1.default.Router();
router.post("/", replyController_1.addReply);
exports.default = router;
