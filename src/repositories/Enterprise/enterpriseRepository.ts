import { Enterprise, mapDataToEnterprise } from '../../entities/enterprise';
import {
	IEnterpriseData,
	IEnterpriseRepository,
} from './IEnterpriseRepository';
import { prisma } from '../../utils/prisma';

export class EnterpriseRepository implements IEnterpriseRepository {
	async findById(id: number): Promise<Enterprise | null> {
		const query = await prisma.enterprise.findUnique({
			where: { id },
		});

		if (!query) {
			return null;
		}

		return mapDataToEnterprise(query);
	}

	async findBySlug(slug: string): Promise<Enterprise | null> {
		const query = await prisma.enterprise.findUnique({
			where: { slug },
		});

		if (!query) {
			return null;
		}

		return mapDataToEnterprise(query);
	}

	async findByCnpj(cnpj: string): Promise<Enterprise | null> {
		const query = await prisma.enterprise.findUnique({
			where: { cnpj },
		});

		if (!query) {
			return null;
		}

		return mapDataToEnterprise(query);
	}

	async findByCpf(cpf: string): Promise<Enterprise | null> {
		const query = await prisma.enterprise.findUnique({
			where: { cpf },
		});

		if (!query) {
			return null;
		}

		return mapDataToEnterprise(query);
	}

	async findByOrganizationId(organizationId: number): Promise<Enterprise[]> {
		const query = await prisma.enterprise.findMany({
			where: { organization_id: organizationId },
		});

		return query.map(mapDataToEnterprise);
	}

	async create(enterpriseData: IEnterpriseData): Promise<Enterprise> {
		const query = await prisma.enterprise.create({
			data: {
				slug: enterpriseData.slug,
				cnpj: enterpriseData.cnpj ?? null,
				cpf: enterpriseData.cpf ?? null,
				address: enterpriseData.address ?? null,
				organization_id: enterpriseData.organization_id,
			},
		});

		return mapDataToEnterprise(query);
	}

	async update(enterpriseData: IEnterpriseData): Promise<Enterprise> {
		const query = await prisma.enterprise.update({
			where: { id: enterpriseData.id },
			data: {
				slug: enterpriseData.slug,
				cnpj: enterpriseData.cnpj ?? null,
				cpf: enterpriseData.cpf ?? null,
				active: enterpriseData.active,
				address: enterpriseData.address ?? null,
				updated_at: new Date(),
			},
		});

		return mapDataToEnterprise(query);
	}
}
