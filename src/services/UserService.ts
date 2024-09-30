// src/services/UserService.ts
import { IUserRepository } from "../repositories/IUserRepository.ts";
import { UserRepository } from "../repositories/UserRepository.ts";
import { User } from "../entities/User.ts";
import { validate } from "class-validator";
import { CreateUserDTO } from "../DTOs/CreateUserDTO.ts";

// create a Interface for this class
export interface IUserService {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  registerUser(userData: Partial<User>): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async registerUser(userData: Partial<User>): Promise<User> {
    const createUserDTO = new CreateUserDTO(
      userData.nick!,
      userData.email!,
      userData.password!
    );
    const user = await createUserDTO.validatedUser();
    return this.userRepository.register(user);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
