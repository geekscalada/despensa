export class RegisterUserDTO {
  readonly nick: string;
  readonly email: string;
  readonly password?: string;

  constructor(nick: string, email: string, password?: string | undefined) {
    this.nick = nick;
    this.email = email;
    this.password = password;
  }
}
