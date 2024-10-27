import express from 'express';
import { env } from './env';

const app = express();

app.set('port', env.port);

export default app;
