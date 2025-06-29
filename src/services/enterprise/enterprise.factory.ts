import { EnterpriseRepository } from "../../repositories/Enterprise/enterprise.repository";
import { EnterpriseService } from "./enterprise.service";

export function makeEnterpriseFactory() {
    const enterpriseRepository = new EnterpriseRepository();

    const enterpriseService = new EnterpriseService(enterpriseRepository);

    return enterpriseService;
}