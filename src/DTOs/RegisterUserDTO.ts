export class RegisterUserDTO {
  readonly nick: string;
  readonly email: string;
  readonly password: string | undefined;

  constructor(nick: string, email: string, password?: string | undefined) {
    this.nick = nick;
    this.email = email;
    if (!password) {
      this.password = undefined;
    }
  }
}
