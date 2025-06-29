import { User, mapDataToUser } from "../../entities/User";
import { prisma } from "../../utils/prisma";
import { IUserData, IUserRepository } from "./IUserRepository";

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
}