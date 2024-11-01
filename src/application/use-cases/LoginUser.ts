import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

export class LoginUser {
  constructor(private userService: UserService, private authService: AuthService) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      const token = this.authService.generateToken(user.id!, user.roleId);
      return token;
    }
    return null; // Credenciais inválidas
  }
}
