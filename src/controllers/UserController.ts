// src/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService.ts";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { nick, email, password } = req.body;

    try {
      // Delegar la creación del usuario al servicio
      const createdUser = await this.userService.createUser({
        nick,
        email,
        password,
      });
      return res.status(201).json(createdUser);
    } catch (error) {
      //TODO: error 400 debería validarse en la capa de DTOs
      return res.status(400); //.json({ message: error.message });
    }
  }
}
