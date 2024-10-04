"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
const class_validator_1 = require("class-validator");
const User_1 = require("../domain/entities/User");
const ValidationException_1 = require("../app/exceptions/ValidationException");
class CreateUserDTO {
    nick;
    email;
    password;
    constructor(nick, email, password) {
        this.nick = nick;
        this.email = email;
        this.password = password;
    }
    async validatedUser() {
        const user = new User_1.User();
        user.nick = this.nick;
        user.email = this.email;
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            throw new ValidationException_1.ValidationException("Problema en la validación", errors);
        }
        // Si todo es válido, devolvemos el objeto
        return {
            nick: this.nick,
            email: this.email,
        };
    }
}
exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=CreateUserDTO.js.map