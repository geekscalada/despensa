import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  AfterLoad,
  OneToOne,
} from "typeorm";
import { IsEmail, Length, Matches } from "class-validator";
import { Exclude } from "class-transformer";
import { Password } from "./Password";

@Entity()
@Unique("UQ_user_email", ["email"]) // El correo debe ser único + nombre constraint
@Unique("UQ_user_nick", ["nick"])
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id!: number;

  @Column()
  @Length(4, 20, { message: "El nick debe tener entre 4 y 20 caracteres" })
  nick!: string;

  @Column()
  @IsEmail({}, { message: "Debes proporcionar un correo válido" })
  email!: string;

  @OneToOne(() => Password, (password) => password.user, { cascade: true })
  password!: Password;
}
