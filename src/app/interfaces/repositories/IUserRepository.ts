// src/repositories/IUserRepository.ts
import { User } from "../../../domain/entities/User";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(
    email: string,
    relations?: Array<keyof User>
  ): Promise<User | null>;
  register(user: Partial<User>): Promise<User>;
  // TODO: wich is the data that we can to update?
  update(id: number, userData: Partial<User>): Promise<User>;
  // TODO: Who can delete a user?
  delete(id: number): Promise<void>;
}
