import { IEnterpriseData } from '../repositories/Enterprise/IEnterpriseRepository';
import { Entity } from './entity';

export interface IEnterpriseProps {
    id?: number;
    slug: string;
    cnpj?: string;
    cpf?: string;
    address?: string;
    organizationId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Enterprise extends Entity<IEnterpriseProps>{
	declare public readonly props: IEnterpriseProps;

	constructor(props: IEnterpriseProps) {
		super(props);
	}

	get id(): number | undefined {
		return this.props.id;
	}

	get slug(): string {
		return this.props.slug;
	}

	get cnpj(): string | undefined {
		return this.props.cnpj;
	}

	get cpf(): string | undefined {
		return this.props.cpf;
	}

	get address(): string | undefined {
		return this.props.address;
	}

	get organizationId(): number {
		return this.props.organizationId;
	}

	get createdAt(): Date | undefined {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	mapToPersistency(): IEnterpriseData {
		return {
			id: this.id,
			slug: this.slug,
			cnpj: this.cnpj,
			cpf: this.cpf,
			address: this.address,
			organization_id: this.organizationId,
			created_at: this.createdAt,
			updated_at: this.updatedAt,
		};
	}
}

export function mapDataToEnterprise(enterprise: IEnterpriseData): Enterprise {
	return new Enterprise({
		id: enterprise.id,
		slug: enterprise.slug,
		cnpj: enterprise.cnpj ?? undefined,
		cpf: enterprise.cpf ?? undefined,
		address: enterprise.address ?? undefined,
		organizationId: enterprise.organization_id,
		createdAt: enterprise.created_at ?? undefined,
		updatedAt: enterprise.updated_at ?? undefined,
	});
}

