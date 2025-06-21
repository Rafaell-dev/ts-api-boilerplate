import { UserRepository } from "../../../repositories/users/user.repository";
import { generateToken } from "../../../utils/jwt";

export interface LoginServiceParams {
    email: string;
    password: string;
}

export interface LoginServiceResult {
    token?: string;
    status: 1 | 0; 
    message: string;
}

export class LoginService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

	public async execute(params: LoginServiceParams): Promise<LoginServiceResult> {
        try {
            const existingUser = await this.userRepository.findByEmail(params.email);

            if (!existingUser) {
                return {
                    status: 0,
                    message: "User not found"
                };
            }

            if (existingUser.password !== params.password) {
                return {
                    status: 0,
                    message: "Invalid password"
                };
            }

            const token = generateToken({ userId: existingUser.id, email: existingUser.email });

            return { token, status: 1, message: "Login successful" };
        } catch (error) {
            console.log("Error during login:", error);
            return {
                status: 0,
                message: "Internal server error"
            };
        }
    }

}
