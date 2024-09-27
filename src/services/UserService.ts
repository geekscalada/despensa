// src/services/UserService.ts
import { IUserRepository } from "../repositories/IUserRepository.ts";
import { UserRepository } from "../repositories/UserRepository.ts";
import { User } from "../entities/User.ts";
import { validate } from "class-validator";
import { CreateUserDTO } from "../DTOs/CreateUserDTO.ts";

export class UserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  //TODO: ¿partial peta, por qué?
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const createUserDTO = new CreateUserDTO(
        userData.nick!,
        userData.email!,
        userData.password!
      );
      const user = await createUserDTO.validatedUser();
  
      return this.userRepository.create(user);
    } catch (error) {
      console.log("error: ", error);

      return {} as User;

    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
