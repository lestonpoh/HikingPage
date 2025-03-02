"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.getComments = void 0;
const connect_1 = require("../connect");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
// get comments
const validateGetComments = [(0, express_validator_1.query)("id").notEmpty().isInt()];
exports.getComments = [
    ...validateGetComments,
    async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const db = await connect_1.dbConnection;
            const getCommentsQuery = `SELECT comment.id as comment_id, comment.description as comment_description, comment.createdAt as comment_createdAt, user.username as comment_username, reply.id as reply_id, reply.description as reply_description, reply.createdAt as reply_createdAt, user_reply.username as reply_username FROM comment
        JOIN user ON comment.userId = user.id
        LEFT JOIN reply ON comment.id = reply.commentId
        LEFT JOIN user as user_reply ON reply.userId = user_reply.id
        WHERE comment.hikeId = (?)
        ORDER BY comment.createdAt DESC, reply.createdAt DESC`;
            const [output] = await db.execute(getCommentsQuery, [req.query.id]);
            const commentsData = output;
            const comments = [];
            commentsData.forEach((row) => {
                let comment = comments.find((comment) => comment.id === row.comment_id);
                if (!comment) {
                    comment = {
                        id: row.comment_id,
                        username: row.comment_username,
                        description: row.comment_description,
                        createdAt: row.comment_createdAt,
                        replies: [],
                    };
                    comments.push(comment);
                }
                if (row.reply_id) {
                    comment.replies.push({
                        id: row.reply_id,
                        username: row.reply_username,
                        description: row.reply_description,
                        createdAt: row.reply_createdAt,
                    });
                }
            });
            res.status(200).json(comments);
            return;
        }
        catch (err) {
            res.status(500).json(err);
            return;
        }
    },
];
// add comment
const validateAddComment = [
    (0, express_validator_1.body)("hikeId").notEmpty().isInt(),
    (0, express_validator_1.body)("description").notEmpty().isLength({ max: 1000 }),
];
exports.addComment = [
    ...validateAddComment,
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
            const insertCommentQuery = "INSERT INTO comment (`hikeId`,`userId`,`description`,`createdAt`) VALUES (?,?,?,?)";
            const values = [
                req.body.hikeId,
                userInfo.id,
                req.body.description,
                (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            ];
            await db.execute(insertCommentQuery, values);
            res.status(200).json("Comment added");
            return;
        }
        catch (err) {
            console.log(err);
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
