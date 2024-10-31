import {
  CreateUserUsecase,
  CreateUserInputDto,
} from '../../../../src/application/use-cases/user/CreateUserUsecase';
import { UserRepository } from '../../../../src/domain/repositories/UserRepository';
import { RoleRepository } from '../../../../src/domain/repositories/RoleRepository';
import { BcryptHashService } from '../../../../src/infrastructure/third-party/BcryptHashService';
import { User } from '../../../../src/domain/entities/User';
import { Role } from '../../../../src/domain/entities/Role';

describe('CreateUserUsecase', () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let roleRepositoryMock: jest.Mocked<RoleRepository>;
  let hashServiceMock: jest.Mocked<BcryptHashService>;
  let createUserUsecase: CreateUserUsecase;

  const input: CreateUserInputDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    roleId: crypto.randomUUID(),
  };

  const userInstance = new User({
    id: crypto.randomUUID(), // Este ID será gerado pelo Prisma na vida real
    name: input.name,
    email: input.email,
    password: 'hashed_password', // Este valor será gerado pelo HashService
    roleId: input.roleId,
  });

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as any;

    roleRepositoryMock = {
      findById: jest.fn(),
    } as any;

    hashServiceMock = {
      hashPassword: jest.fn().mockResolvedValue('hashed_password'),
      comparePassword: jest.fn(),
      saltRounds: 10, // Se necessário
    } as any;

    createUserUsecase = new CreateUserUsecase(
      userRepositoryMock,
      roleRepositoryMock,
      hashServiceMock
    );
  });

  it('deve criar um novo usuário com sucesso', async () => {
    roleRepositoryMock.findById.mockResolvedValue(new Role({ id: input.roleId, name: 'admin' })); // Simula role existente
    userRepositoryMock.findByEmail.mockResolvedValue(null); // Simula que o email não está em uso
    userRepositoryMock.save.mockResolvedValue(userInstance); // Mock da função

    const output = await createUserUsecase.execute(input);

    expect(output).toEqual({
      id: userInstance.id, // ID gerado pelo Prisma
      name: input.name,
      email: input.email,
      roleId: input.roleId,
    });
  });

  it('deve lançar um erro se o email já estiver em uso', async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(userInstance); // Simula que o email já está em uso

    await expect(createUserUsecase.execute(input)).rejects.toThrow('Email já existe');
  });

  it('deve lançar um erro se a role não existir', async () => {
    roleRepositoryMock.findById.mockResolvedValue(null); // Simula que a role não existe
    userRepositoryMock.findByEmail.mockResolvedValue(null); // Simula que o email não está em uso

    await expect(createUserUsecase.execute(input)).rejects.toThrow('Role não encontrada');
  });

  // Adicione outros testes conforme necessário
});
