import { RoleRepository } from '../../domain/repositories/RoleRepository';
import { Role } from '../../domain/entities/Role';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaRoleRepository implements RoleRepository {
  async findById(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { id },
    });
    if (!role) return null;
    return new Role(role);
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { name },
    });
    if (!role) return null;
    return new Role(role);
  }

  async save(role: Role): Promise<void> {
    await prisma.role.upsert({
      where: { id: role.id! },
      update: {
        name: role.name,
      },
      create: {
        name: role.name,
      },
    });
  }
}
