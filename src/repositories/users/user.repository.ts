import { User } from "../../entities/User";
import { prisma } from "../../utils/prisma";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return null;
        }

        return new User(user);
    }

    async create(user: User): Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
            },
        });

        return new User(createdUser);
    }

    async update(user: User): Promise<User> {
        const updatedUser =  await prisma.user.update({
            where: { id: user.id },
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
            },
        });

        return new User(updatedUser);
    }

    async delete(userId: string): Promise<void> {
        await prisma.user.delete({
            where: { id: userId },
        });
    }
}