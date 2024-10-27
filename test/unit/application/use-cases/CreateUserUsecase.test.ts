import {
  CreateUserUsecase,
  CreateUserInputDto,
  CreateUserOutputDto,
} from '../../../../src/application/use-cases/user/CreateUserUsecase';
import { UserRepository } from '../../../../src/domain/repositories/UserRepository';
import { RoleRepository } from '../../../../src/domain/repositories/RoleRepository';

describe('CreateUserUsecase', () => {
  let createUserUsecase: CreateUserUsecase;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let roleRepositoryMock: jest.Mocked<RoleRepository>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<UserRepository>;

    roleRepositoryMock = {
      save: jest.fn(),
      findByName: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<RoleRepository>;

    createUserUsecase = new CreateUserUsecase(userRepositoryMock, roleRepositoryMock);
  });

  it('deve criar um novo usuário com sucesso', async () => {
    const input: CreateUserInputDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'plain_password',
      roleId: 'roleId',
    };

    roleRepositoryMock.findById.mockResolvedValue({ id: 'roleId', name: 'user' });
    userRepositoryMock.save.mockResolvedValue({
      id: 'userId',
      name: input.name,
      email: input.email,
      password: 'hashed_password',
      roleId: input.roleId,
    });

    const output: CreateUserOutputDto = await createUserUsecase.execute(input);

    expect(output).toEqual({
      id: 'userId',
      name: input.name,
      email: input.email,
      password: 'hashed_password',
      roleId: input.roleId,
    });
  });

  it('deve lançar um erro se o email já existir', async () => {
    const input: CreateUserInputDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'plain_password',
      roleId: 'roleId',
    };

    userRepositoryMock.findByEmail.mockResolvedValue({
      id: 'existingUserId',
      name: 'Existing User',
      email: input.email,
      password: 'hashed_password',
      roleId: input.roleId,
    });

    await expect(createUserUsecase.execute(input)).rejects.toThrow('Email já existe');
  });

  it('deve lançar um erro se o roleId não for encontrado', async () => {
    const input: CreateUserInputDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'plain_password',
      roleId: 'invalidRoleId',
    };

    roleRepositoryMock.findById.mockResolvedValue(null);

    await expect(createUserUsecase.execute(input)).rejects.toThrow('Role não encontrada');
  });
});
