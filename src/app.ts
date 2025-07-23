import express from 'express';
import routes from './routes';
import cors from "cors";
import { env } from './utils/env';

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use('/api/v1', routes);

export default app;
