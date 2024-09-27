import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User.ts';
import { IUserRepository } from './IUserRepository';
import { AppDataSource } from '../infrastructure/config/database.ts';

export class UserRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }


  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findById(id) as Promise<User>;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
