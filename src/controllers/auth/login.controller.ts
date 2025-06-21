import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { makeLoginFactory } from "../../services/auth/login/login.factory";

export class LoginController {
	public static async manipular(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const authSchema = z.object({
				email: z.string().email({ message: "Invalid email." }),
				password: z
					.string()
					.min(6, { message: "The password must have at least 6 characters." }),
			});

			const { email, password } = authSchema.parse(req.body);

			const loginService = makeLoginFactory();

			const result = await loginService.execute({ email, password });

			if (!result) {
				return res.status(401).json({ message: "Password or email invalid." });
			}

			return res.status(200).json({ token: result.token });
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json({
					message: "Valitation error.",
					errors: err.errors,
				});
			}

			return next(err);
		}
	}
}
