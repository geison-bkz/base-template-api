import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './presentation/routes/authRoutes';
import userRoutes from './presentation/routes/userRoutes';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('API está rodando!');
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
