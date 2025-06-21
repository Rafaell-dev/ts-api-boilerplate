import { UserRepository } from "../../../repositories/users/user.repository";
import { LoginService } from "./login.service";

export function makeLoginFactory() {
    const usersRepository = new UserRepository();
    
    const loginService = new LoginService(usersRepository);

    return loginService;
}