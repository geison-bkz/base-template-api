import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { UserProps } from '../../domain/entities/User';

const authService = new AuthService();

interface AuthenticatedRequest extends Request {
  user?: UserProps;
}

export const AuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = authService.verifyToken(token) as UserProps;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
