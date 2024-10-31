import { UserService } from '../services/UserService';
import { User, UserProps } from '../../domain/entities/User';

export class CreateUser {
  constructor(private userService: UserService) {}

  async execute(userProps: Omit<UserProps, 'id'>): Promise<User> {
    return this.userService.createUser(userProps);
  }
}
