"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../../controllers/AuthController");
const AuthMiddleware_1 = require("../../../infrastructure/middlewares/AuthMiddleware");
const UserController_1 = require("../../../controllers/UserController");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
const userController = new UserController_1.UserController();
// Ruta para crear un usuario
// El bind es necesario para que el método createUser mantenga el contexto de la clase UserController
router.post("/register", userController.registerUser.bind(authController));
router.post("/login", userController.login.bind(authController));
router.post("/refresh-token", authController.refreshToken.bind(authController));
// Ruta protegida con el middleware de autenticación
router.get("/fakeProtectedArea", AuthMiddleware_1.AuthMiddleware, (req, res) => {
    res.json({ message: "Tienes acceso a este recurso protegido" });
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map