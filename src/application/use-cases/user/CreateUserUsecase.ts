import { z } from 'zod';
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { Usecase } from '../Usecase';
import { HashService } from '../../../infrastructure/third-party/HashService';

// Definindo o esquema de validação
const CreateUserInputDtoSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  roleId: z.string().uuid({ message: 'ID da role inválido' }),
});

export type CreateUserInputDto = z.infer<typeof CreateUserInputDtoSchema>;

export type CreateUserOutputDto = {
  id: string;
  name: string;
  email: string;
  roleId: string;
};

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashService: HashService
  ) {}

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
    const hashedPassword = await this.hashService.hashPassword(input.password);
    const aUser = new User({
      id: '',
      name: input.name,
      email: input.email,
      password: hashedPassword,
      roleId: input.roleId,
    });

    // Salva o usuário no repositório
    const savedUser = await this.userRepository.save(aUser);

    // Retorna o output com o ID gerado
    const output: CreateUserOutputDto = {
      id: savedUser.id!, // Aqui o ID é garantido que está definido após o save
      name: aUser.name,
      email: aUser.email,
      roleId: aUser.roleId,
    };

    return output;
  }
}
