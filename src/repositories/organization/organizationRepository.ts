
import { Organization, mapDataToOrganization } from "../../entities/organization";
import { prisma } from '../../utils/prisma';
import { IOrganizationData, IOrganizationRepository } from "./IOrganizationRepository";

export class OrganizationRepository implements IOrganizationRepository {
    async create(organization: Omit<IOrganizationData, "id">): Promise<Organization> {
        const createdOrganization = await prisma.organization.create({
            data: {
                slug: organization.slug,
                description: organization.description,
                active: true,
            },
        });

        return mapDataToOrganization(createdOrganization);
    }

    async findById(id: number): Promise<Organization | null> {
        const organization = await prisma.organization.findUnique({
            where: { id },
        });

        if (!organization) {
            return null;
        }

        return mapDataToOrganization(organization);
    }

    async findBySlug(slug: string): Promise<Organization | null> {
        const organization = await prisma.organization.findUnique({
            where: { slug },
        });

        if (!organization) {
            return null;
        }

        return mapDataToOrganization(organization);
    }

    async update(organization: IOrganizationData): Promise<Organization> {
        const updatedOrganization = await prisma.organization.update({
            where: { id: organization.id },
            data: {
                slug: organization.slug,
                description: organization.description,
                active: organization.active,
            },
        });

        return mapDataToOrganization(updatedOrganization);
    }
}