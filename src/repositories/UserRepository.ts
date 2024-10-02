import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";
import { AppDataSource } from "../infrastructure/config/database";

export class UserRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(
    email: string,
    relations?: Array<keyof User>
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: relations ? (relations as string[]) : undefined,
    });
  }

  async register(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  // TODO: check this methods
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findById(id) as Promise<User>;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
