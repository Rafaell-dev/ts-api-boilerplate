import { IOrganizationData } from "../repositories/organization/IOrganizationRepository";
import { Entity } from "./entity";

export interface IOrganizationProps {
    id?: number;
    slug: string;
    description?: string;
    active: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export class Organization extends Entity<IOrganizationProps>{
    declare public props: IOrganizationProps;

    constructor(props: IOrganizationProps) {
        super(props);
    }

    get id(): number | undefined {
        return this.props.id;
    }

    get slug(): string {
        return this.props.slug;
    }

    set slug(value: string) {
        this.props.slug = value;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    set description(value: string | undefined) {
        this.props.description = value;
    }

    get active(): boolean {
        return this.props.active;
    }

    set active(value: boolean) {
        this.props.active = value;
    }

    get createdAt(): Date | undefined {
        return this.props.created_at;
    }

    get updatedAt(): Date | undefined {
        return this.props.updated_at;
    }

    mapToPersistency(): IOrganizationProps {
        return {
            id: this.id,
            slug: this.slug,
            description: this.description,
            active: this.active,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}

export function mapDataToOrganization(organization: IOrganizationData): Organization {
    return new Organization({
        id: organization.id,
        slug: organization.slug,
        description: organization.description ?? undefined,
        active: organization.active,
        created_at: organization.created_at,
        updated_at: organization.updated_at
    });
}