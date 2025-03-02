"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReply = void 0;
const connect_1 = require("../connect");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
// add comment
const validateAddReply = [
    (0, express_validator_1.body)("commentId").notEmpty().isInt(),
    (0, express_validator_1.body)("description").notEmpty().isLength({ max: 1000 }),
];
exports.addReply = [
    ...validateAddReply,
    async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const token = req.cookies.accessToken;
        if (!token) {
            res.status(401).json("Not logged in!");
            return;
        }
        try {
            const db = await connect_1.dbConnection;
            const userInfo = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const insertReplyQuery = "INSERT INTO reply (`commentId`,`userId`,`description`,`createdAt`) VALUES (?,?,?,?)";
            const values = [
                req.body.commentId,
                userInfo.id,
                req.body.description,
                (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            ];
            db.execute(insertReplyQuery, values);
            res.status(200).json("Reply has been created");
            return;
        }
        catch (err) {
            if (err.name === "JsonWebTokenError") {
                res.status(403).json("Token not valid");
                return;
            }
            else {
                res.status(500).json(err);
                return;
            }
        }
    },
];
