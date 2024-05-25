import { Request, Response, NextFunction } from 'express';
import { decodeToken, verifyToken } from '../utils/token';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: undefined | string = req.cookies.request_token;

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized: No token provided',
    });
  }

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized: No token provided',
    });
  } else if (!verifyToken(token)) {
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized: Invalid token',
    });
  }

  return next();
}
