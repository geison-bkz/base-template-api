import { UserService } from '../../src/application/services/UserService';
import { User } from '../../src/domain/entities/User';
import { UserRepository } from '../../src/domain/repositories/UserRepository';

const mockUserRepository: UserRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  save: jest.fn(),
};

const userService = new UserService(mockUserRepository);

describe('UserService', () => {
  it('should create a new user', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      roleId: 'user-role',
    };
    const newUser = new User({ id: '123', ...userProps });

    (mockUserRepository.save as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await userService.createUser(userProps);
    expect(mockUserRepository.save).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual(expect.objectContaining(userProps));
  });

  it('should get a user by ID', async () => {
    const userProps = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      roleId: 'user-role',
    };
    const user = new User(userProps);

    (mockUserRepository.findById as jest.Mock).mockResolvedValueOnce(user);

    const result = await userService.getUserById('123');
    expect(mockUserRepository.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(user);
  });

  it('should get a user by email', async () => {
    const userProps = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      roleId: 'user-role',
    };
    const user = new User(userProps);

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(user);

    const result = await userService.getUserByEmail('john@example.com');
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(result).toEqual(user);
  });
});
