import "reflect-metadata"; // Necesario para TypeORM
import app from "./app/app"; // Importamos la configuración de la aplicación
import { connectDB } from "./infrastructure/config/database";

// Función para arrancar el servidor
const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to the database");

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
    process.exit(1); // Cierra el proceso si no se puede conectar a la base de datos
  }
};

startServer();
