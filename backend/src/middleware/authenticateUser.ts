import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/token';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  try {
    const decodedToken = decodeToken<{ role: 'admin' | 'user' }>(token);

    if (!decodedToken) {
      return res.status(401).send({
        status: 401,
        message: 'Unauthorized: Invalid token',
      });
    }

    if (decodedToken.role !== 'admin') {
      return res.status(403).send({
        status: 403,
        message: 'Forbidden: User is not an admin',
      });
    }
  } catch (error) {
    return res.status(403).send({
      status: 403,
      message: 'Forbidden: Unable to decode token',
    });
  }

  return next();
}
