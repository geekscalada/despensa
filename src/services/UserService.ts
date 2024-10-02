// src/services/UserService.ts
import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { validate } from "class-validator";
import { CreateUserDTO } from "../DTOs/CreateUserDTO";
import { Password } from "../entities/Password";
import { AuthService } from "./AuthService";
import { RegisterUserDTO } from "../DTOs/RegisterUserDTO";

// create a Interface for this class
export interface IUserService {
  findById(id: number): Promise<User | null>;
  findByEmail(
    email: string,
    relations?: Array<keyof User>
  ): Promise<User | null>;
  registerUser(userData: RegisterUserDTO): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(
    email: string,
    relations?: Array<keyof User>
  ): Promise<User | null> {
    return this.userRepository.findByEmail(email, relations);
  }

  //TODO: change this any
  async registerUser(userData: RegisterUserDTO): Promise<User> {
    //const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Crear nuevo usuario
    const hashedPassword = await this.authService.hashPassword(
      userData.password!
    );

    // Crear una instancia de Password
    const passwordEntity = new Password();
    passwordEntity.hash = hashedPassword;

    const createUserDTO = new CreateUserDTO(userData.nick!, userData.email!);
    const user = await createUserDTO.validatedUser();

    console.log("user: ", user);

    user.password = passwordEntity;

    return this.userRepository.register(user);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
