import { DataSource } from "typeorm";
import sanitizedConfig from "./dotenv.ts";
import { User } from "../../entities/User.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: sanitizedConfig.DB_HOST, // Usamos las variables de entorno
  port: sanitizedConfig.DB_PORT,
  username: sanitizedConfig.DB_USER,
  password: sanitizedConfig.DB_PASSWORD,
  database: sanitizedConfig.DB_NAME,
  entities: [User], // Aquí se añaden las entidades
  synchronize: true, // Solo en desarrollo; para producción es recomendable usar migraciones
  logging: true, // Habilitar logging para depurar
  dropSchema: true,
  migrationsRun: true,
  migrations: ["src/migrations/*.ts"]
});



export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Salir si la conexión falla
  }
};
