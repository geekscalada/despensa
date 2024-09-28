// src/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService.ts";
import { QueryFailedError } from "typeorm";
import { nextTick } from "process";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction ): Promise<Response | void> {
    try {
      const { nick, email, password } = req.body;    
        
        const createdUser = await this.userService.createUser({
          nick,
          email,
          password,
        });
        return res.status(201).json(createdUser);
    } catch (error) {
      next(error);
      
    }


    
  }
}
