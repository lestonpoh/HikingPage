"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHike = exports.updateHike = exports.addHike = exports.getHikeDetails = exports.getHikes = void 0;
const connect_1 = require("../connect");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
const express_validator_1 = require("express-validator");
const uploadMultipleFiles_1 = require("../utils/uploadMultipleFiles");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const getHikes = async (req, res) => {
    try {
        const db = await connect_1.dbConnection;
        const getHikesQuery = "SELECT name, location, elevation ,difficulty, duration, fileName FROM hike LEFT JOIN photo ON hike.id = photo.hikeId AND photo.isCover = true ORDER BY createdAt DESC";
        const [hikeData] = await (await db).execute(getHikesQuery);
        res.status(200).json(hikeData);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
exports.getHikes = getHikes;
const getHikeDetails = async (req, res) => {
    try {
        const db = await connect_1.dbConnection;
        const getHikeDetailsQuery = "SELECT hike.id, name, description, location, elevation, difficulty, duration, fileName, isCover FROM hike LEFT JOIN photo ON hike.id = photo.hikeId AND photo.isCover = false WHERE REPLACE(LOWER(name), ' ', '-') = (?)";
        const [hikeData] = await db.execute(getHikeDetailsQuery, [req.params.name]);
        const hikeDetails = hikeData;
        if (!hikeDetails || hikeDetails.length === 0) {
            res.status(404).json("Not Found");
            return;
        }
        const output = {
            id: hikeDetails[0].id,
            name: hikeDetails[0].name,
            description: hikeDetails[0].description,
            location: hikeDetails[0].location,
            elevation: hikeDetails[0].elevation,
            difficulty: hikeDetails[0].difficulty,
            duration: hikeDetails[0].duration,
            photos: [],
            comments: [],
        };
        hikeDetails.forEach((row) => {
            if (row.fileName) {
                if (row.isCover) {
                    output.coverPhoto = row.fileName;
                }
                else {
                    output.photos.push(row.fileName);
                }
            }
        });
        const getCommentsQuery = `SELECT comment.id as comment_id, comment.description as comment_description, comment.createdAt as comment_createdAt, user.username as comment_username, reply.id as reply_id, reply.description as reply_description, reply.createdAt as reply_createdAt, user_reply.username as reply_username FROM comment
            JOIN user ON comment.userId = user.id
            LEFT JOIN reply ON comment.id = reply.commentId
            LEFT JOIN user as user_reply ON reply.userId = user_reply.id
            WHERE comment.hikeId = (?)
            ORDER BY comment.createdAt DESC, reply.createdAt DESC`;
        const [commentOutput] = await db.execute(getCommentsQuery, [
            hikeDetails[0].id,
        ]);
        const commentsData = commentOutput;
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
                    username: row.reply_username,
                    description: row.reply_description,
                    createdAt: row.reply_createdAt,
                });
            }
        });
        output.comments = comments;
        res.status(200).json(output);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
exports.getHikeDetails = getHikeDetails;
const unlinkFiles = (filenames) => {
    if (filenames) {
        filenames.forEach((filename) => {
            fs_1.default.unlink("./src/uploads/" + filename, (err) => {
                if (err)
                    console.error("Failed to delete file on validation failure", err);
            });
        });
    }
};
// ADD POST
const validateAddHike = [
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty().isLength({ max: 2000 }),
    (0, express_validator_1.body)("location").notEmpty().isLength({ max: 100 }),
    (0, express_validator_1.body)("elevation").notEmpty().isInt({ min: 0 }),
    (0, express_validator_1.body)("difficulty").notEmpty().isInt({ min: 0, max: 10 }),
    (0, express_validator_1.body)("duration").notEmpty().isFloat({ min: 0 }),
];
exports.addHike = [
    async (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            res.status(401).json("Not logged in!");
            return;
        }
        try {
            const userInfo = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.userInfo = userInfo;
            next();
        }
        catch (err) {
            res.status(403).json("Token not valid");
            return;
        }
    },
    uploadMultipleFiles_1.multerUpload.fields([
        { name: "coverFile", maxCount: 1 },
        { name: "photoFiles" },
    ]),
    ...validateAddHike,
    async (req, res) => {
        const files = req.files;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            unlinkFiles(files.coverFile.map((file) => file.filename));
            unlinkFiles(files.photoFiles.map((file) => file.filename));
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const db = await connect_1.dbConnection;
            const checkHikeNameQuery = "SELECT id FROM hike WHERE hike.name = (?)";
            const [checkHikeNameData] = await db.execute(checkHikeNameQuery, [
                req.body.name,
            ]);
            if (checkHikeNameData.length) {
                unlinkFiles(files.coverFile.map((file) => file.filename));
                unlinkFiles(files.photoFiles.map((file) => file.filename));
                res.status(409).json("Name already exist!");
                return;
            }
            const insertHikeQuery = "INSERT INTO hike (`userId`,`name`,`description`, `location`, `elevation`, `difficulty`, `duration`,`createdAt`) VALUES (?,?,?,?,?,?,?,?)";
            const values = [
                req.userInfo.id,
                req.body.name,
                req.body.description,
                req.body.location,
                req.body.elevation,
                req.body.difficulty,
                req.body.duration,
                (0, moment_1.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            ];
            const [insertHikeData] = await db.execute(insertHikeQuery, values);
            const hikeId = insertHikeData.insertId;
            if (!req.files || req.files.length === 0) {
                res.status(200).json("Hike has been created with no files");
                return;
            }
            if (files.coverFile) {
                const coverFileName = files.coverFile[0].filename;
                const coverQuery = "INSERT INTO photo (`hikeId`,`fileName`,`isCover`) VALUES (?,?,?)";
                const coverValues = [hikeId, coverFileName, true];
                await db.execute(coverQuery, coverValues);
            }
            if (files.photoFiles) {
                files.photoFiles.forEach(async (file) => {
                    const fileName = file.filename;
                    const photoQuery = "INSERT INTO photo (`hikeId`, `fileName`, `isCover`) VALUES (?,?,?)";
                    const photoValues = [hikeId, fileName, false];
                    await db.execute(photoQuery, photoValues);
                });
            }
            res.status(200).json("Hike has been created with files");
            return;
        }
        catch (err) {
            res.status(500).json(err);
            return;
        }
    },
];
// UPDATE POST
const validateUpdateHike = [
    (0, express_validator_1.body)("description").notEmpty().isLength({ max: 2000 }),
    (0, express_validator_1.body)("location").notEmpty().isLength({ max: 100 }),
    (0, express_validator_1.body)("elevation").notEmpty().isInt({ min: 0 }),
    (0, express_validator_1.body)("difficulty").notEmpty().isInt({ min: 0, max: 10 }),
    (0, express_validator_1.body)("duration").notEmpty().isFloat({ min: 0 }),
];
exports.updateHike = [
    async (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            res.status(401).json("Not logged in!");
            return;
        }
        try {
            const userInfo = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.userInfo = userInfo;
            next();
        }
        catch (err) {
            res.status(403).json("Token not valid");
            return;
        }
    },
    uploadMultipleFiles_1.multerUpload.fields([
        { name: "coverFile", maxCount: 1 },
        { name: "photoFiles" },
    ]),
    ...validateUpdateHike,
    async (req, res) => {
        const files = req.files;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            unlinkFiles(files.coverFile.map((file) => file.filename));
            unlinkFiles(files.photoFiles.map((file) => file.filename));
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const db = await connect_1.dbConnection;
            const getHikeIdQuery = "SELECT id FROM hike WHERE hike.name = (?)";
            const [hikeIdData] = await db.execute(getHikeIdQuery, [
                req.params.name,
            ]);
            if (!hikeIdData || hikeIdData.length === 0) {
                res.status(404).json("Not Found");
                return;
            }
            const hikeId = hikeIdData[0].id;
            const updateQuery = "UPDATE hike SET `description`=?, `location`=?, `elevation`=?, `difficulty`=?, `duration`=? WHERE id = ?";
            const values = [
                req.body.description,
                req.body.location,
                req.body.elevation,
                req.body.difficulty,
                req.body.duration,
                hikeId,
            ];
            await db.execute(updateQuery, values);
            // Get all existing photos
            const getHikePhotosQuery = "SELECT fileName FROM photo WHERE photo.hikeId = ?";
            const [hikePhotosData] = await db.execute(getHikePhotosQuery, [
                hikeId,
            ]);
            unlinkFiles(hikePhotosData.map((file) => file.fileName));
            // delete all photos from hike in db
            const deletePhotosQuery = "DELETE FROM photo WHERE hikeId = ?";
            await db.execute(deletePhotosQuery, [hikeId]);
            if (!req.files || req.files.length === 0) {
                res.status(200).json("Hike has been created with no files");
                return;
            }
            const files = req.files;
            if (files.coverFile) {
                const coverFileName = files.coverFile[0].filename;
                const coverQuery = "INSERT INTO photo (`hikeId`,`fileName`,`isCover`) VALUES (?,?,?)";
                const coverValues = [hikeId, coverFileName, true];
                await db.execute(coverQuery, coverValues);
            }
            if (files.photoFiles) {
                files.photoFiles.forEach(async (file) => {
                    const fileName = file.filename;
                    const photoQuery = "INSERT INTO photo (`hikeId`, `fileName`, `isCover`) VALUES (?,?,?)";
                    const photoValues = [hikeId, fileName, false];
                    await db.execute(photoQuery, photoValues);
                });
            }
            res.status(200).json("Hike has been created with files");
            return;
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
    },
];
const deleteHike = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json("Not logged in!");
        return;
    }
    try {
        const db = await connect_1.dbConnection;
        await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const hikeId = req.params.id;
        // Get all existing photos
        const getHikePhotosQuery = "SELECT fileName FROM photo WHERE photo.hikeId = ?";
        const deletePhotosQuery = "DELETE FROM photo WHERE hikeId = ?";
        const deleteHikeQuery = "DELETE FROM hike WHERE id = ?";
        const getRepliesQuery = "SELECT reply.id FROM comment INNER JOIN reply ON comment.id = reply.commentId WHERE comment.hikeId = ?";
        const deleteReplyQuery = "DELETE FROM reply WHERE id = ?";
        const deleteCommentQuery = "DELETE from comment WHERE hikeId=?";
        const [photos] = await db.execute(getHikePhotosQuery, [hikeId]);
        console.log(photos);
        unlinkFiles(photos.map((file) => file.fileName));
        // Delete all photos from hike in DB
        await db.execute(deletePhotosQuery, [hikeId]);
        // Get replies and delete
        const [replies] = await db.execute(getRepliesQuery, [hikeId]);
        // Delete each reply one by one
        for (const row of replies) {
            await db.execute(deleteReplyQuery, [row.id]);
        }
        // delete comment
        await db.execute(deleteCommentQuery, [hikeId]);
        // delete hike
        await db.execute(deleteHikeQuery, [hikeId]);
        // Send success response
        res.status(200).json("Hike deleted successfully");
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
};
exports.deleteHike = deleteHike;
