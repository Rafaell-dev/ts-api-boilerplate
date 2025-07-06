import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createLogger } from './pino';

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  userId: number;
  email: string;
  organizationId: number;
  iat: number;
  exp: number;
}

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const context = {
		path: req.host + req.originalUrl,
		method: req.method,
		ip: req.ip,
	};
  
	const logger = createLogger('authMiddleware');
  
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		logger.warn(context, 'Missing authorization header');
		res.status(401).json({
			message: 'Authorization token not provided',
			error: 'MISSING_TOKEN',
		});
		return;
	}

	const tokenParts = authHeader.split(' ');

	if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
		logger.warn({ ...context, authHeader }, 'Invalid auth header format');
		res.status(401).json({
			message: 'Invalid authorization header format. Expected: Bearer <token>',
			error: 'INVALID_AUTH_FORMAT',
		});
		return;
	}

	const token = tokenParts[1];

	if (!JWT_SECRET) {
		logger.error('JWT_SECRET environment variable is not defined');
		res.status(500).json({
			message: 'Internal server error',
			error: 'SERVER_CONFIGURATION_ERROR',
		});
		return;
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		if (typeof decoded !== 'object' || !decoded || !('userId' in decoded)) {
			logger.warn({ ...context, token }, 'Invalid token payload');
			res.status(401).json({
				message: 'Invalid token payload',
				error: 'INVALID_TOKEN_PAYLOAD',
			});
			return;
		}

		const payload = decoded as JwtPayload;

		if (!payload.userId || !payload.email || !payload.organizationId) {
			logger.warn({ ...context, payload }, 'Incomplete token payload');
			res.status(401).json({
				message: 'Invalid token: missing required fields',
				error: 'INCOMPLETE_TOKEN_PAYLOAD',
			});
			return;
		}

		logger.info({
			...context,
			userId: payload.userId,
			email: payload.email,
			orgId: payload.organizationId,
		}, 'User authenticated');

		req.user = {
			id: payload.userId,
			email: payload.email,
			organizationId: payload.organizationId,
		};

		next();
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			logger.warn(context, 'Token expired');
			res.status(401).json({
				message: 'Token has expired',
				error: 'TOKEN_EXPIRED',
			});
			return;
		}

		if (err instanceof jwt.JsonWebTokenError) {
			logger.warn(context, 'Invalid token');
			res.status(401).json({
				message: 'Invalid token',
				error: 'INVALID_TOKEN',
			});
			return;
		}

		logger.error({ ...context, err }, 'Authentication error');
		res.status(401).json({
			message: 'Authentication failed',
			error: 'AUTH_ERROR',
		});
		return;
	}
}