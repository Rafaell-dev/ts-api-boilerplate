import { Enterprise } from '../../entities/enterprise';
import { EnterpriseRepository } from '../../repositories/Enterprise/enterpriseRepository';
import { createLogger } from '../../utils/pino';

export interface EnterpriseServiceParams {
    id?: number;
    cnpj?: string;
    cpf?: string;
    address?: string;
    slug: string;
    active: boolean;
    organizationId: number;
}

export interface EnterpriseServiceResult {
    enterprise?: Enterprise;
    status: 1 | 0;
    message: string;
}

export class EnterpriseService {
	constructor(
        private readonly enterpriseRepository: EnterpriseRepository,
	) {}

	private static logger = createLogger('EnterpriseService');

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
				active: true,
				slug: params.slug.toLowerCase(),
				organization_id: params.organizationId,
			});

			return {
				enterprise,
				status: 1,
				message: 'Enterprise created successfully.',
			};
		} catch (error) {
			EnterpriseService.logger.error('Error creating enterprise:', error);
			return {
				status: 0,
				message: 'Internal server error.',
			};
		}
	}

	public async update(params: EnterpriseServiceParams): Promise<EnterpriseServiceResult> {
		try {
			if (!params.id || isNaN(Number(params.id))) {
				return {
					status: 0,
					message: 'Invalid enterprise ID.',
				};
			}

			const existingEnterprise = await this.enterpriseRepository.findById(Number(params.id));

			if (!existingEnterprise) {
				return {
					status: 0,
					message: 'Enterprise not found.',
				};
			}

			if (params.slug) {
				const existingEnterpriseSlug = await this.enterpriseRepository.findBySlug(params.slug);

				if (existingEnterpriseSlug && existingEnterpriseSlug.id !== existingEnterprise.id) {
					return {
						status: 0,
						message: 'Enterprise with this slug already exists.',
					};
				}
			}

			if (params.cpf) {
				const existingEnterpriseCpf = await this.enterpriseRepository.findByCpf(params.cpf);

				if (existingEnterpriseCpf && existingEnterpriseCpf.id !== existingEnterprise.id) {
					return {
						status: 0,
						message: 'Enterprise with this CPF already exists.',
					};
				}
			}

			if (params.cnpj) {
				const existingEnterpriseCnpj = await this.enterpriseRepository.findByCnpj(params.cnpj);

				if (existingEnterpriseCnpj && existingEnterpriseCnpj.id !== existingEnterprise.id) {
					return {
						status: 0,
						message: 'Enterprise with this CNPJ already exists.',
					};
				}
			}

			const updatedData = {
				id: Number(params.id),
				cnpj: params.cnpj || null,
				cpf: params.cpf || null,
				address: params.address || null,
				active: params.active,
				slug: params.slug ? params.slug.toLowerCase() : existingEnterprise.slug,
				organization_id: existingEnterprise.organizationId,
			};

			const updatedEnterprise = await this.enterpriseRepository.update(updatedData);

			return {
				enterprise: updatedEnterprise,
				status: 1,
				message: 'Enterprise updated successfully.',
			};
		} catch (error) {
			EnterpriseService.logger.error('Error updating enterprise:', error);
			return {
				status: 0,
				message: 'Internal server error.',
			};
		}
	}

	public async list(organizationId: number): Promise<Enterprise[]> {
		try {
			return await this.enterpriseRepository.findByOrganizationId(organizationId);
		} catch (error) {
			EnterpriseService.logger.error('Error listing enterprises:', error);
			throw new Error('Internal server error.');
		}
	}

	public async getById(id: number): Promise<Enterprise | null> {
		try {
			return await this.enterpriseRepository.findById(id);
		} catch (error) {
			EnterpriseService.logger.error('Error fetching enterprise by ID:', error);
			throw new Error('Internal server error.');
		}
	}
}