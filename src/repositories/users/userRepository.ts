import { User, mapDataToUser } from '../../entities/user';
import { prisma } from '../../utils/prisma';
import { IUserData, IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return null;
		}

		return mapDataToUser(user);
	}

	async findById(id: number): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			return null;
		}

		return mapDataToUser(user);
	}

	async create(user: IUserData): Promise<User> {
		const createdUser = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				name: user.name,
				organization_id: user.organization_id,
			},
		});

		return mapDataToUser(createdUser);
	}

	async update(user: IUserData): Promise<User> {
		const updatedUser =  await prisma.user.update({
			where: { id: user.id },
			data: {
				email: user.email,
				password: user.password,
				name: user.name,
			},
		});

		return mapDataToUser(updatedUser);
	}

	async findAllByOrganizationId(organizationId: number): Promise<User[]> {
		const users = await prisma.user.findMany({
			where: { organization_id: organizationId },
		});

		return users.map(mapDataToUser);
	}
}