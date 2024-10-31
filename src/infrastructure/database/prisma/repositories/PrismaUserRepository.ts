import { User } from '../../../../domain/entities/User';
import { UserRepository } from '../../../../domain/repositories/UserRepository';
import prisma from '../../../../config/database';

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? new User(user) : null; // Certifique-se de que a instância de User seja criada corretamente
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? new User(user) : null; // Certifique-se de que a instância de User seja criada corretamente
  }

  async save(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      },
    });
    return new User(createdUser); // Retorna a instância de User
  }
}
