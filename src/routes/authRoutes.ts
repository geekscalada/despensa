import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserController } from "../controllers/UserController";

const router = Router();
const authController = new AuthController();
const userController = new UserController();

// Ruta para crear un usuario
// El bind es necesario para que el método createUser mantenga el contexto de la clase UserController
router.post("/register", userController.registerUser.bind(authController));
router.post("/login", userController.login.bind(authController));
router.post("/refresh-token", authController.refreshToken.bind(authController));



// Ruta protegida con el middleware de autenticación
router.get("/fakeProtectedArea", AuthMiddleware, (req, res) => {
  res.json({ message: "Tienes acceso a este recurso protegido" });
});

export default router;
