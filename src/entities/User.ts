import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { IsEmail, Length, Matches } from "class-validator";

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

  // @Matches needs to use "validate" function from "class-validator" package when you want to register a user
  @Column()
  @Length(8, 14, {
    message: "La contraseña debe tener entre 8 y 14 caracteres",
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message: "La contraseña debe tener al menos una mayúscula y un número",
  })
  password!: string;
}
