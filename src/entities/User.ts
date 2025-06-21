import { IUserData } from "../repositories/users/IUserRepository";
import { Entity } from "./Entity";

export interface IUserProps {
	id?: number;
	email: string;
	password: string;
	name?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class User extends Entity<IUserProps> {
	declare public readonly props: IUserProps;

	constructor(props: IUserProps) {
		super(props);
	}

	get id(): number | undefined {
		return this.props.id;
	}

	get email(): string {
		return this.props.email;
	}

	get password(): string {
		return this.props.password;
	}

	get name(): string | undefined {
		return this.props.name;
	}

	get createdAt(): Date | undefined {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	mapToPersistency(): IUserData {
		return {
			id: this.props.id,
			email: this.props.email,
			password: this.props.password,
			name: this.props.name,
			created_at: this.props.createdAt,
			updated_at: this.props.updatedAt,
		};
	}
}
