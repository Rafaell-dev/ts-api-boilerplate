import { EnterpriseRepository } from '../../repositories/Enterprise/enterpriseRepository';
import { EnterpriseService } from './enterpriseService';

export function makeEnterpriseFactory() {
	const enterpriseRepository = new EnterpriseRepository();

	const enterpriseService = new EnterpriseService(enterpriseRepository);

	return enterpriseService;
}