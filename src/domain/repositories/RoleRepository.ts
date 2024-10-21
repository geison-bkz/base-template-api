import { Role } from '../entities/Role';

export interface RoleRepository {
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  save(role: Role): Promise<void>;
}
