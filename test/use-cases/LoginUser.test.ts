import { LoginUser } from '../../src/application/use-cases/LoginUser';
import { UserService } from '../../src/application/services/UserService';
import { AuthService } from '../../src/application/services/AuthService';
import { User } from '../../src/domain/entities/User';
import { UserRepository } from '../../src/domain/repositories/UserRepository';

const mockUserRepository: UserRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  save: jest.fn(),
};

const userService = new UserService(mockUserRepository);

const authService = new AuthService();
jest.spyOn(authService, 'generateToken').mockReturnValue('valid-token');
jest.spyOn(authService, 'verifyToken').mockReturnValue({ userId: '123', role: 'admin-role' });

describe('LoginUser', () => {
  it('should return a token for valid credentials', async () => {
    const userProps = {
      id: '123',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      roleId: 'admin-role',
    };
    const user = new User(userProps);

    jest.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(user);

    const loginUser = new LoginUser(userService, authService);
    const result = await loginUser.execute('jane@example.com', 'password123');
    expect(userService.getUserByEmail).toHaveBeenCalledWith('jane@example.com');
    expect(authService.generateToken).toHaveBeenCalledWith('123', 'admin-role');
    expect(result).toBe('valid-token');
  });

  it('should return null for invalid credentials', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(null);
    const loginUser = new LoginUser(userService, authService);
    const result = await loginUser.execute('jane@example.com', 'wrongpassword');
    expect(userService.getUserByEmail).toHaveBeenCalledWith('jane@example.com');
    expect(result).toBeNull();
  });
});
