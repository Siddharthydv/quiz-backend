"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication")); //authentication middleware
const config_1 = require("./config"); // hardcoded credentials
const quizRouter_1 = __importDefault(require("./routers/quizRouter")); //router for quiz related routes
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_URL, // Allow frontend URL
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/quizzes', authentication_1.default, quizRouter_1.default);
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (email !== config_1.STATIC_USER.email || password !== config_1.STATIC_USER.password) {
        res.status(400).json("wrong credentials");
        return;
    }
    res.cookie("auth", "logged_in", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({ message: "Login successful" });
    return;
});
app.get('/logout', authentication_1.default, (req, res) => {
    res.clearCookie("auth", { httpOnly: true, secure: true, sameSite: "none" });
    res.status(200).json({ message: "Logged out successfully" });
});
app.get('/healthy', (req, res) => {
    res.json("healthy");
});
app.listen(3000, () => {
    console.log('server running');
});
