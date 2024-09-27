import { Router } from 'express';
import { UserController } from '../controllers/UserController.ts'

const router = Router();
const userController = new UserController();

// Ruta para crear un usuario
// El bind es necesario para que el método createUser mantenga el contexto de la clase UserController
router.post('/user', userController.createUser.bind(userController));

export default router;