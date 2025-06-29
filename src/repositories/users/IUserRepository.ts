import { User } from "../../entities/User";

export interface IUserData {
	id?: number;
    email: string;
    password: string;
    name: string;
	organization_id: number;
	created_at: Date;
	updated_at?: Date;
}

export interface IUserRepository {
	findByEmail(email: string): Promise<User | null>;
	create(user: IUserData): Promise<User>;
	update(user: IUserData): Promise<User>;
}
