import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/users/userRepository';
import { hashPassword } from '../../utils/bcrypt';
import { createLogger } from '../../utils/pino';

export interface UserServiceParams {
	id?: number;
	email: string;
	password: string;
	name: string;
	organizationId: number;
}

export interface UserServiceResult<T = Omit<User, 'password'>> {
	user?: T;
	status: 1 | 0;
	message: string;
}

export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	private static logger = createLogger('UserService');

	public async create(params: UserServiceParams): Promise<UserServiceResult> {
		try {
			const existingUser = await this.userRepository.findByEmail(
				params.email
			);

			if (existingUser) {
				return {
					status: 0,
					message: 'User with this email already exists.',
				};
			}

			const user = new User({
				email: params.email,
				password: await hashPassword(params.password),
				name: params.name,
				organizationId: params.organizationId,
				createdAt: new Date(),
			});

			const createdUser = await this.userRepository.create(
				user.mapToPersistency()
			);

			const { password, ...safeUserProps} = createdUser.props;

			return {
				status: 1,
				message: 'User created successfully.',
				user: safeUserProps as Omit<User, 'password'>,
			};
		} catch (error) {
			UserService.logger.error('Error creating user:', error);
			return {
				status: 0,
				message: 'An error occurred while creating the user.',
			};
		}
	}

	public async update(
		params: Partial<UserServiceParams>
	): Promise<UserServiceResult> {
		try {
			if (!params.id) {
				return {
					status: 0,
					message: 'User ID is required for update.',
				};
			}

			const user = await this.userRepository.findById(params.id);

			if (!user) {
				return {
					status: 0,
					message: 'User not found.',
				};
			}

			if (params.email) {
				const existingUser = await this.userRepository.findByEmail(
					params.email
				);

				if (existingUser && existingUser.id !== user.id) {
					return {
						status: 0,
						message: 'User with this email already exists.',
					};
				}
				user.email = params.email;
			}

			if (params.name) {
				user.name = params.name;
			}

			if (params.password) {
				user.password = await hashPassword(params.password);
			}

			const updatedUser = await this.userRepository.update(
				user.mapToPersistency()
			);

			const { password, ...safeUser } = updatedUser.props;

			return {
				status: 1,
				message: 'User updated successfully.',
				user: safeUser as Omit<User, 'password'>,
			};
		} catch (error) {
			UserService.logger.error('Error updating user:', error);
			return {
				status: 0,
				message: 'An error occurred while updating the user.',
			};
		}
	}

	public async list(
		organizationId: number
	): Promise<UserServiceResult<Omit<User, 'password'>[]>> {
		try {
			const users = await this.userRepository.findAllByOrganizationId(organizationId);
	
			return {
				status: 1,
				message: 'Users retrieved successfully.',
				user: users.map(user => {
					const { password, ...safeUserProps } = user.props;
					return safeUserProps;
				}) as Omit<User, 'password'>[],
			};
		} catch (error) {
			UserService.logger.error('Error listing users:', error);
			return {
				status: 0,
				message: 'An error occurred while retrieving users.',
			};
		}
	}

	public async getById(
		id: number
	): Promise<UserServiceResult<Omit<User, 'password'>>> {
		try {
			const user = await this.userRepository.findById(id);

			if (!user) {
				return {
					status: 0,
					message: 'User not found.',
				};
			}

			const { password, ...safeUserProps } = user.props;

			return {
				status: 1,
				message: 'User retrieved successfully.',
				user: safeUserProps as Omit<User, 'password'>,
			};
		} catch (error) {
			UserService.logger.error('Error retrieving user by ID:', error);
			return {
				status: 0,
				message: 'An error occurred while retrieving the user.',
			};
		}
	}
}
