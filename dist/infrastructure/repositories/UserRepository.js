"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../../domain/entities/User");
const database_1 = require("../config/database");
class UserRepository {
    userRepository;
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async findById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email, relations) {
        return this.userRepository.findOne({
            where: { email },
            relations: relations ? relations : undefined,
        });
    }
    async register(userData) {
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }
    // TODO: check this methods
    async update(id, userData) {
        await this.userRepository.update(id, userData);
        return this.findById(id);
    }
    async delete(id) {
        await this.userRepository.delete(id);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map