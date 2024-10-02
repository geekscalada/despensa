// src/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { QueryFailedError } from "typeorm";
import { nextTick } from "process";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
}
