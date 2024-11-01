import { CreateUser } from '../../src/application/use-cases/CreateUser';
import { UserService } from '../../src/application/services/UserService';
import { User } from '../../src/domain/entities/User';
import { UserRepository } from '../../src/domain/repositories/UserRepository';

const mockUserRepository: UserRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  save: jest.fn(),
};

const userService = new UserService(mockUserRepository);

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const userProps = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      roleId: 'admin-role',
    };
    const newUser = new User({ id: '123', ...userProps });

    jest.spyOn(userService, 'createUser').mockResolvedValueOnce(newUser);

    const createUser = new CreateUser(userService);
    const result = await createUser.execute(userProps);

    expect(userService.createUser).toHaveBeenCalledWith(userProps);
    expect(result).toEqual(newUser);
  });
});
