import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsEmail, Length, Matches } from 'class-validator';

@Entity()
@Unique(['email'])  // El correo debe ser único
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(4, 20, { message: 'El nick debe tener entre 4 y 20 caracteres' })
  nick!: string;

  @Column()
  @IsEmail({}, { message: 'Debes proporcionar un correo válido' })
  email!: string;

  @Column()
  @Length(8, 14, { message: 'La contraseña debe tener entre 8 y 14 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, { 
    message: 'La contraseña debe tener al menos una mayúscula y un número' 
  })
  password!: string;
}
