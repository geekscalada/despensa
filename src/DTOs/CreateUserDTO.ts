//TODO: ¿podriamos usar simplemente UserDTO?

import { validate, ValidationError } from "class-validator";
import { User } from "../entities/User.ts";

export class CreateUserDTO {
  readonly nick: string;
  readonly email: string;
  readonly password: string;

  constructor(nick: string, email: string, password: string) {
    this.nick = nick;
    this.email = email;
    this.password = password;
  }

  async validatedUser(): Promise<Partial<User>> {
    const user = new User();
    user.nick = this.nick;
    user.email = this.email;
    user.password = this.password;

    await validate(user);

    // Si todo es válido, devolvemos el objeto
    return {
      nick: this.nick,
      email: this.email,
      password: this.password,
    };
  }
}
