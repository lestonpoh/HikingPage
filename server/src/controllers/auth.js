"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.logout = exports.login = exports.register = void 0;
const connect_1 = require("../connect");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateRegister = [
    (0, express_validator_1.body)("username").notEmpty(),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email cannot be empty").isEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password cannot be empty"),
];
exports.register = [
    ...validateRegister,
    async (req, res) => {
        // validate input
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const db = await connect_1.dbConnection;
            // check if username exists
            const getUserQuery = "SELECT * FROM user WHERE username = ? or email = ?";
            const [userData] = await db.execute(getUserQuery, [
                req.body.username,
                req.body.email,
            ]);
            if (userData.length) {
                res.status(409).json("User already exist!");
                return;
            }
            // hashPassword
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
            const insertUserQuery = "INSERT INTO user (`username`,`email`,`password`,`isAdmin`) VALUES (?,?,?,?)";
            await db.execute(insertUserQuery, [
                req.body.username,
                req.body.email,
                hashedPassword,
                1,
            ]);
            res.status(200).json("User has been created.");
            return;
        }
        catch (err) {
            res.status(500).json(err);
            return;
        }
    },
];
const validateLogin = [
    (0, express_validator_1.body)("email").notEmpty().isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
];
exports.login = [
    ...validateLogin,
    async (req, res) => {
        // validate inputs
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const db = await connect_1.dbConnection;
            // check if user exist
            const getUserQuery = "SELECT * FROM user WHERE email = ?";
            const [userData] = await db.execute(getUserQuery, [req.body.email]);
            if (userData.length === 0) {
                res.status(404).json("User not found!");
                return;
            }
            const checkPassword = bcryptjs_1.default.compareSync(req.body.password, userData[0].password);
            if (!checkPassword) {
                res.status(400).json("Wrong password!");
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: userData[0].id }, process.env.JWT_SECRET);
            res
                .cookie("accessToken", token, {
                // httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .json({
                username: userData[0].username,
                isAdmin: !!userData[0].isAdmin,
            });
            return;
        }
        catch (err) {
            res.status(500).json(err);
            return;
        }
    },
];
const logout = (req, res) => {
    res
        .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
    })
        .status(200)
        .json("User has been logged out");
};
exports.logout = logout;
const validateUser = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json("Not logged in!");
        return;
    }
    try {
        const db = await connect_1.dbConnection;
        const userInfo = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const getUserQuery = "SELECT username, isAdmin FROM user WHERE id = ?";
        const [userData] = await db.execute(getUserQuery, [userInfo.id]);
        if (userData.length === 0) {
            res.status(404).json("User not found!");
            return;
        }
        res
            .status(200)
            .json({ username: userData[0].username, isAdmin: !!userData[0].isAdmin });
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
exports.validateUser = validateUser;
