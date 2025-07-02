import { UserRepository } from '../../../repositories/users/userRepository';
import { LoginService } from './loginService';

export function makeLoginFactory() {
	const usersRepository = new UserRepository();
    
	const loginService = new LoginService(usersRepository);

	return loginService;
}