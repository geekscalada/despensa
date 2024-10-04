"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, nick: user.nick }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, nick: user.nick }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    }
    validateAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        }
        catch (err) {
            return null;
        }
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=JwtService.js.map