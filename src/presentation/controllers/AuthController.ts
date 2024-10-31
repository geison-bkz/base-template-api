import { Request, Response } from 'express';
import { LoginUser } from '../../application/use-cases/LoginUser';
import { UserService } from '../../application/services/UserService';
import { AuthService } from '../../application/services/AuthService';
import { PrismaUserRepository } from '../../infrastructure/prisma/PrismaUserRepository';

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService();
const loginUser = new LoginUser(userService, authService);

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await loginUser.execute(email, password);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  }
}
