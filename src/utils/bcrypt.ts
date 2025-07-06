import bcrypt from 'bcryptjs';

const saltRounds = 12;

export async function hashPassword(plainPassword: string): Promise<string> {
	return await bcrypt.hash(plainPassword, saltRounds);
}
