// src/services/UserService.ts
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { validate } from "class-validator";
import { CreateUserDTO } from "../../DTOs/CreateUserDTO";
import { Password } from "../../domain/entities/Password";
import { AuthService } from "./AuthService";
import { RegisterUserDTO } from "../../DTOs/RegisterUserDTO";
import { IUserService } from "../interfaces/IUserService";

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
