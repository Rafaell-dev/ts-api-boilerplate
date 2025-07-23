import Pino from 'pino';

type enviroment = 'development' | 'production' | 'staging' | 'test';

export const env = {
	ENVIROMENT: (process.env.ENVIROMENT || 'development') as enviroment,
    
	PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    
	JWT_SECRET: process.env.JWT_SECRET,
    
	DATABASE_URL: process.env.DATABASE_URL,

	LOG_DESTINATION: process.env.LOG_DESTINATION || null,
	LOG_LEVEL: (process.env.LOG_LEVEL || 'info') as Pino.Level,
	LOG_TO_STDOUT: process.env.LOG_TO_STDOUT === 'true',

	CORS_ORIGIN: process.env.CORS_ORIGIN,
} as const;