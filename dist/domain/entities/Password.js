"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const class_validator_1 = require("class-validator");
let Password = class Password {
    id;
    // TODO: this validation is not working because this is the hash of the password
    // so we need to extact this logic to a validator of the pass
    // @Matches needs to use "validate" function from "class-validator" package when you want to register a user
    // @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    //   message: "La contraseña debe tener al menos una mayúscula y un número",
    // })
    hash;
    // Relación uno a uno con la entidad User
    user;
};
exports.Password = Password;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Password.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(8, 14, {
        message: "La contraseña debe tener entre 8 y 14 caracteres",
    })
    // TODO: this validation is not working because this is the hash of the password
    // so we need to extact this logic to a validator of the pass
    // @Matches needs to use "validate" function from "class-validator" package when you want to register a user
    // @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    //   message: "La contraseña debe tener al menos una mayúscula y un número",
    // })
    ,
    __metadata("design:type", String)
], Password.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.password, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)() // Indica que esta entidad tendrá la FK de referencia de User
    ,
    __metadata("design:type", User_1.User)
], Password.prototype, "user", void 0);
exports.Password = Password = __decorate([
    (0, typeorm_1.Entity)()
], Password);
//# sourceMappingURL=Password.js.map