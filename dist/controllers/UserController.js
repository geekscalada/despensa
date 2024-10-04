"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../app/services/UserService");
const AuthService_1 = require("../app/services/AuthService");
const InvalidCredentialsException_1 = require("../infrastructure/middlewares/exceptions/InvalidCredentialsException");
class UserController {
    authService;
    userService;
    constructor() {
        this.authService = new AuthService_1.AuthService();
        this.userService = new UserService_1.UserService();
    }
    async registerUser(req, res, next) {
        try {
            const { nick, email, password } = req.body;
            const createdUser = await this.userService.registerUser({
                nick,
                email,
                password,
            });
            // Generar tokens
            const accessToken = this.authService.generateAccessToken(createdUser);
            const refreshToken = this.authService.generateRefreshToken(createdUser);
            return res.status(201).json({ accessToken, refreshToken });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        console.log(req.body);
        const { email, password } = req.body;
        try {
            const user = await this.userService.findByEmail(email, ["password"]);
            if (!user ||
                !(await this.authService.comparePasswords(password, user.password.hash))) {
                throw new InvalidCredentialsException_1.InvalidCredentialsException("Credenciales inválidas");
            }
            // Generar tokens
            const accessToken = this.authService.generateAccessToken(user);
            const refreshToken = this.authService.generateRefreshToken(user);
            return res.status(200).json({ accessToken, refreshToken });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map