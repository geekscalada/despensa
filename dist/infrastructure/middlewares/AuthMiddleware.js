"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const AuthService_1 = require("../../app/services/AuthService");
const UnauthorizedException_1 = require("./exceptions/UnauthorizedException");
const InvalidTokenException_1 = require("./exceptions/InvalidTokenException");
const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        throw new UnauthorizedException_1.UnauthorizedException("User doesn't have token");
    }
    const authService = new AuthService_1.AuthService();
    const payload = authService.validateAccessToken(token);
    if (!payload) {
        throw new InvalidTokenException_1.InvalidTokenException("Token inválido o expirado", "Token inválido o expirado");
    }
    req.user = payload;
    next();
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map