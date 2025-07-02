import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const generateToken = (payload: object): string => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};
