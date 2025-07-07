import { Organization } from "@prisma/client";
import { createLogger } from "../../utils/pino";
import { OrganizationRepository } from "../../repositories/organization/organizationRepository";

export interface OrganizationServiceParams {
    id?: number;
    slug: string;
    name?: string;
    description?: string;
    active?: boolean;
}

export interface OrganizationServiceResult<T = Organization> {
    organization?: T;
    status: 1 | 0;
    message: string;
}

export class OrganizationService {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    private static logger = createLogger('OrganizationService');

    public async create(params: OrganizationServiceParams): Promise<OrganizationServiceResult> {
        try {
            if (!params.slug) {
                return {
                    status: 0,
                    message: 'Organization slug is required.',
                };
            }

            const existingOrganization = await this.organizationRepository.findBySlug(params.slug);

            if (existingOrganization) {
                return {
                    status: 0,
                    message: 'Organization with this slug already exists.',
                };
            }

            const organization = await this.organizationRepository.create({
                slug: params.slug,
                description: params.description ?? '',
                active: params.active ?? true,
                created_at: new Date(),
            });

            return {
                organization: organization.props as Organization,
                status: 1,
                message: 'Organization created successfully.',
            };
        } catch (error) {
            OrganizationService.logger.error('Error creating organization:', error);
            return {
                status: 0,
                message: 'Failed to create organization.',
            };
        }
    }   

    public async getByID(id: number): Promise<OrganizationServiceResult> {
        try {
            if (!id) {
                return {
                    status: 0,
                    message: 'Organization ID is required.',
                };
            }

            const organization = await this.organizationRepository.findById(id);

            if (!organization) {
                return {
                    status: 0,
                    message: 'Organization not found.',
                };
            }

            return {
                organization: organization.props as Organization,
                status: 1,
                message: 'Organization retrieved successfully.',
            };
        } catch (error) {
            OrganizationService.logger.error('Error retrieving organization:', error);
            return {
                status: 0,
                message: 'Failed to retrieve organization.',
            };
        }
    }

    public async update(params: Partial<OrganizationServiceParams>): Promise<OrganizationServiceResult> {
        try {
            if (!params.id) {
                return {
                    status: 0,
                    message: 'Organization ID is required for update.',
                };
            }

            const organization = await this.organizationRepository.findById(params.id);

            if (!organization) {
                return {
                    status: 0,
                    message: 'Organization not found.',
                };
            }

            if (params.slug) {
                const existingOrganization = await this.organizationRepository.findBySlug(params.slug);
                if (existingOrganization && existingOrganization.id !== organization.id) {
                    return {
                        status: 0,
                        message: 'Organization with this slug already exists.',
                    };
                }
                organization.slug = params.slug;
            }

            if (params.description !== undefined) {
                organization.description = params.description;
            }

            if (params.active !== undefined) {
                organization.active = params.active;
            }

            const updatedOrganization = await this.organizationRepository.update(organization.mapToPersistency());

            return {
                organization: updatedOrganization.props as Organization,
                status: 1,
                message: 'Organization updated successfully.',
            };
        } catch (error) {
            OrganizationService.logger.error('Error updating organization:', error);
            return {
                status: 0,
                message: 'Failed to update organization.',
            };
        }
    }
}