"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("../src/routes/auth"));
const users_1 = __importDefault(require("../src/routes/users"));
const commentRoute_1 = __importDefault(require("../src/routes/commentRoute"));
const hikeRoute_1 = __importDefault(require("../src/routes/hikeRoute"));
const replyRoute_1 = __importDefault(require("../src/routes/replyRoute"));
const path = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/comment", commentRoute_1.default);
app.use("/api/hike", hikeRoute_1.default);
app.use("/api/reply", replyRoute_1.default);
app.use("/uploads", express_1.default.static(path.join(__dirname, "uploads")));
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running - listening on port ${port}!`);
});
