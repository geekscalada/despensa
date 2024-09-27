import dotenv from 'dotenv';
// Cargar las variables desde el archivo .env
dotenv.config();
// Validar que las variables estén definidas
const getConfig = () => {
    return {
        PORT: Number(process.env.PORT),
        DB_HOST: process.env.DB_HOST || '',
        DB_PORT: Number(process.env.DB_PORT),
        DB_USER: process.env.DB_USER || '',
        DB_PASSWORD: process.env.DB_PASSWORD || 'myDbPassword',
        DB_NAME: process.env.DB_NAME || '',
        JWT_SECRET: process.env.JWT_SECRET || '',
    };
};
// Validar que las variables críticas existan
const getSanitizedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined || value === '') {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
export default sanitizedConfig;
