"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../app/services/AuthService");
const UserService_1 = require("../app/services/UserService");
const UserNotFoundException_1 = require("../infrastructure/middlewares/exceptions/UserNotFoundException");
const UnauthorizedException_1 = require("../infrastructure/middlewares/exceptions/UnauthorizedException");
class AuthController {
    authService;
    userService;
    constructor() {
        this.authService = new AuthService_1.AuthService();
        this.userService = new UserService_1.UserService();
    }
    //TODO: Front-end could send the refresh token in the body or in a httpOnly cookie
    async refreshToken(req, res, next) {
        const { refreshToken } = req.body;
        try {
            const payload = this.authService.validateRefreshToken(refreshToken);
            if (!payload) {
                throw new UnauthorizedException_1.UnauthorizedException("Token inválido o expirado", "Invalid or expired refresh token");
            }
            const user = await this.userService.findById(payload.id);
            if (!user) {
                throw new UserNotFoundException_1.UserNotFoundException("User not found");
            }
            const newAccessToken = this.authService.generateAccessToken(user);
            return res.status(200).json({ accessToken: newAccessToken });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map