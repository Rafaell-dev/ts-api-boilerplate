import { UserRepository } from "../../repositories/users/userRepository";
import { UserService } from "./userService";


export function makeUserFactory() {
    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);

    return userService;
}