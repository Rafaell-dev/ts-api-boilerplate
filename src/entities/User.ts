import { IUserData } from '../repositories/users/IUserRepository';
import { Entity } from './entity';

export interface IUserProps {
	id?: number;
	email: string;
	password: string;
	name: string;
	organizationId: number;
	createdAt: Date;
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

	get name(): string {
		return this.props.name;
	}

	get organizationId(): number {
		return this.props.organizationId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	mapToPersistency(): IUserData {
		return {
			id: this.id,
			email: this.email,
			password: this.password,
			name: this.name,
			organization_id: this.organizationId,
			created_at: this.createdAt,
			updated_at: this.updatedAt,
		};
	}
}

export function mapDataToUser(user: IUserData): User {
	return new User({
		id: user.id,
		email: user.email,
		password: user.password,
		name: user.name,
		organizationId: user.organization_id,
		createdAt: user.created_at,
		updatedAt: user.updated_at ?? undefined,
	});
}