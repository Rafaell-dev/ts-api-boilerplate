import { Enterprise } from '../../entities/enterprise';
import { EnterpriseRepository } from '../../repositories/Enterprise/enterpriseRepository';

export interface EnterpriseServiceParams {
    id?: string;
    cnpj?: string;
    cpf?: string;
    address?: string;
    slug: string;
    active?: boolean;
    organizationId: number;
}

export interface EnterpriseServiceResult {
    enterprise?: Enterprise;
    status: 1 | 0;
    message: string;
}

export class EnterpriseService {
	constructor(
        private readonly enterpriseRepository: EnterpriseRepository
	) {}

	public async create(params: EnterpriseServiceParams): Promise<EnterpriseServiceResult> {
		try {
			if (!params.cpf && !params.cnpj) {
				return {
					status: 0,
					message: 'CPF or CNPJ is required.',
				};
			}

			const existingEnterpriseSlug = await this.enterpriseRepository.findBySlug(params.slug);

			if (existingEnterpriseSlug) {
				return {
					status: 0,
					message: 'Enterprise with this slug already exists.',
				};
			}

			if (params.cpf) {
				const existingEnterpriseCpf = await this.enterpriseRepository.findByCpf(params.cpf);

				if (existingEnterpriseCpf) {
					return {
						status: 0,
						message: 'Enterprise with this CPF already exists.',
					};
				}
			}

			if (params.cnpj) {
				const existingEnterpriseCnpj = await this.enterpriseRepository.findByCnpj(params.cnpj);

				if (existingEnterpriseCnpj) {
					return {
						status: 0,
						message: 'Enterprise with this CNPJ already exists.',
					};
				}
			}

			const enterprise = await this.enterpriseRepository.create({
				cnpj: params.cnpj || null,
				cpf: params.cpf || null,
				address: params.address || null,
				slug: params.slug.toLowerCase(),
				organization_id: params.organizationId,
			});

			return {
				enterprise,
				status: 1,
				message: 'Enterprise created successfully.',
			};
		} catch (error) {
			console.error('Error creating enterprise:', error);
			return {
				status: 0,
				message: 'Internal server error.',
			};
		}
	}
}