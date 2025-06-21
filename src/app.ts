import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

export default app;
