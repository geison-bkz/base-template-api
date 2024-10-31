import { Role } from '../../../../domain/entities/Role';
import { RoleRepository } from '../../../../domain/repositories/RoleRepository';
import prisma from '../../../../config/database';

export class PrismaRoleRepository implements RoleRepository {
  async findById(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { id },
    });
    return role ? new Role(role) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { name },
    });
    return role ? new Role(role) : null;
  }

  async save(role: Role): Promise<void> {
    const createdRole = await prisma.role.create({
      data: {
        name: role.name,
      },
    });
  }
}
