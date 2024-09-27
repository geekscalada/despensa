import express from "express";
import pkg from "body-parser";
const { json } = pkg;

import "reflect-metadata";
import { connectDB } from "./infrastructure/config/database.ts";
import userRoutes from "./routes/userRoutes.ts";

const app = express();

app.use(json());


const startServer = async () => {
  try {
    
    await connectDB();
    console.log("Connected to the database");

    // Usar las rutas de usuarios solo después de la conexión
    app.use("/api", userRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.info(`
        ********************************
        Server running on port ${PORT}
        ********************************
      `);
    });
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    process.exit(1); // Cerrar el proceso si no se puede conectar a la base de datos
  }
};

startServer();
