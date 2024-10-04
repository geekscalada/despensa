import { RegisterUserDTO } from "../../DTOs/RegisterUserDTO";
import { User } from "../../domain/entities/User";

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
