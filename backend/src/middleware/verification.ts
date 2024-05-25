import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized',
    });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    return res.status(403).send({
      status: 403,
      message: 'Forbidden',
    });
  }
}
