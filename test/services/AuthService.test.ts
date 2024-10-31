import { AuthService } from '../../src/application/services/AuthService';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('AuthService', () => {
  const authService = new AuthService();
  const userId = '123';
  const role = 'user';

  it('should generate a JWT token', () => {
    (jwt.sign as jest.Mock).mockReturnValue('fake-token');
    const token = authService.generateToken(userId, role);
    expect(jwt.sign).toHaveBeenCalledWith({ userId, role }, expect.any(String), {
      expiresIn: '1h',
    });
    expect(token).toBe('fake-token');
  });

  it('should verify a JWT token', () => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId, role });
    const decoded = authService.verifyToken('fake-token');
    expect(jwt.verify).toHaveBeenCalledWith('fake-token', expect.any(String));
    expect(decoded).toEqual({ userId, role });
  });
});
