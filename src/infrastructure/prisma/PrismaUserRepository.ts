import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return new User(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return new User(user);
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id! },
      update: {
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      },
      create: {
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      },
    });
  }
}
