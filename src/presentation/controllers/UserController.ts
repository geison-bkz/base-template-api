import { Request, Response } from 'express';
import { UserService } from '../../application/services/UserService';
import { PrismaUserRepository } from '../../infrastructure/prisma/PrismaUserRepository';

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

export class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, roleId } = req.body;
    const user = await userService.createUser({ name, email, password, roleId });
    res.status(201).json(user);
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  }
}
