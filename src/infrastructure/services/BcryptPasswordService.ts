import { IPasswordService } from "../../app/interfaces/IPassWordService";
import bcrypt from "bcryptjs";

export class BcryptPasswordService implements IPasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
