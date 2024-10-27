import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { Usecase } from '../Usecase';
import { hashPassword } from '../../../infrastructure/third-party/HashService';

export type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
  roleId: string;
};

export type CreateUserOutputDto = {
  id: string;
  name: string;
  email: string;
  roleId: string;
};

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  private constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  public static create(userRepository: UserRepository, roleRepository: RoleRepository) {
    return new CreateUserUsecase(userRepository, roleRepository);
  }

  public async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    // Verifica se o e-mail já está em uso
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('Email já existe');
    }

    // Verifica se a Role existe
    const role = await this.roleRepository.findById(input.roleId);
    if (!role) {
      throw new Error('Role não encontrada');
    }

    // Cria o usuário com a senha hasheada
    const hashedPassword = await hashPassword(input.password);
    const aUser = new User({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      roleId: input.roleId,
    });

    await this.userRepository.save(aUser);

    const output: CreateUserOutputDto = {
      id: aUser.id!,
      name: aUser.name,
      email: aUser.email,
      roleId: aUser.roleId,
    };

    return output;
  }
}
