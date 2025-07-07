import { OrganizationRepository } from "../../repositories/organization/organizationRepository";
import { OrganizationService } from "./organizationService";

export function makeOrganizationFactory() {
    const organizationRepository = new OrganizationRepository();

    const organizationService = new OrganizationService(organizationRepository);

    return organizationService;
}