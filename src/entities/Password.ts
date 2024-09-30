import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Length, Matches } from "class-validator";

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(8, 14, {
    message: "La contraseña debe tener entre 8 y 14 caracteres",
  })
  // @Matches needs to use "validate" function from "class-validator" package when you want to register a user
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message: "La contraseña debe tener al menos una mayúscula y un número",
  })
  hash!: string;

  // Relación uno a uno con la entidad User
  @OneToOne(() => User, (user) => user.password, { onDelete: "CASCADE" })
  @JoinColumn() // Indica que esta entidad tendrá la FK de referencia de User
  user!: User;
}
