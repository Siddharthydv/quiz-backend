"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate = (req, res, next) => {
    var _a;
    const authCookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.auth; // Check if 'auth' cookie exists
    console.log(authCookie);
    if (authCookie) {
        return next(); // Proceed to the next middleware/route
    }
    res.status(401).json({ error: "Unauthorized" });
};
exports.default = authenticate;
