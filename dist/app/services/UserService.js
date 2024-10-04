"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../../infrastructure/repositories/UserRepository");
const CreateUserDTO_1 = require("../../DTOs/CreateUserDTO");
const Password_1 = require("../../domain/entities/Password");
const AuthService_1 = require("./AuthService");
class UserService {
    userRepository;
    authService;
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.authService = new AuthService_1.AuthService();
    }
    async findById(id) {
        return this.userRepository.findById(id);
    }
    async findByEmail(email, relations) {
        return this.userRepository.findByEmail(email, relations);
    }
    async registerUser(userData) {
        //const hashedPassword = await bcrypt.hash(plainPassword, 10);
        // Crear nuevo usuario
        const hashedPassword = await this.authService.hashPassword(userData.password);
        // Crear una instancia de Password
        const passwordEntity = new Password_1.Password();
        passwordEntity.hash = hashedPassword;
        const createUserDTO = new CreateUserDTO_1.CreateUserDTO(userData.nick, userData.email);
        const user = await createUserDTO.validatedUser();
        user.password = passwordEntity;
        return this.userRepository.register(user);
    }
    async updateUser(id, userData) {
        return this.userRepository.update(id, userData);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map