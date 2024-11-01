import jwt from 'jsonwebtoken';

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'test';

  public generateToken(userId: string, role: string): string {
    const payload = { userId, role };
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '1h', // Token válido por 1 hora
    });
    return token;
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      throw new Error('Token inválido ou expirado');
    }
  }
}
