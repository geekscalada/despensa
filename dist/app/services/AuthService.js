"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const JwtService_1 = require("../../infrastructure/services/JwtService");
const BcryptPasswordService_1 = require("../../infrastructure/services/BcryptPasswordService");
class AuthService {
    tokenService;
    passwordService;
    constructor() {
        this.tokenService = new JwtService_1.JwtService();
        this.passwordService = new BcryptPasswordService_1.BcryptPasswordService();
    }
    generateAccessToken(user) {
        return this.tokenService.generateAccessToken(user);
    }
    generateRefreshToken(user) {
        return this.tokenService.generateRefreshToken(user);
    }
    validateAccessToken(token) {
        return this.tokenService.validateAccessToken(token);
    }
    validateRefreshToken(token) {
        return this.tokenService.validateRefreshToken(token);
    }
    async hashPassword(password) {
        return await this.passwordService.hashPassword(password);
    }
    async comparePasswords(password, hashedPassword) {
        return await this.passwordService.comparePasswords(password, hashedPassword);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map