import { Organization } from "../../entities/organization";

export interface IOrganizationData {
    id?: number;
    slug: string;
    description?: string | null;
    active: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface IOrganizationRepository {
    create(organization: IOrganizationData): Promise<Organization>;
    findById(id: number): Promise<Organization | null>;
    findBySlug(slug: string): Promise<Organization | null>;
    update(organization: IOrganizationData): Promise<Organization>;
}