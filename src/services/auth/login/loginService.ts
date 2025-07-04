import { UserRepository } from '../../../repositories/users/userRepository';
import { generateToken } from '../../../utils/jwt';
import bcrypt from 'bcryptjs';

export interface LoginServiceParams {
    email: string;
    password: string;
}

export interface LoginServiceResult {
    token?: string;
    status: 1 | 0; 
    message: string;
}

export class LoginService {
	constructor(
        private readonly userRepository: UserRepository
	) {}

	public async execute(params: LoginServiceParams): Promise<LoginServiceResult> {
		try {
			const existingUser = await this.userRepository.findByEmail(params.email);

			if (!existingUser) {
				return {
					status: 0,
					message: 'User not found',
				};
			}

			const passwordMatch = await bcrypt.compare(params.password, existingUser.password);

			if(!passwordMatch) {
				return {
					status: 0,
					message: 'Invalid password',
				};
			}

			const token = generateToken({ userId: existingUser.id, email: existingUser.email, organizationId: existingUser.organizationId });

			return { token, status: 1, message: 'Login successful' };
		} catch (error) {
			console.log('Error during login:', error);
			return {
				status: 0,
				message: 'Internal server error',
			};
		}
	}

}
