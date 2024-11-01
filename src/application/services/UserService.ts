import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, UserProps } from '../../domain/entities/User';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userProps: Omit<UserProps, 'id'>): Promise<User> {
    const user = new User(userProps);
    await this.userRepository.save(user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
