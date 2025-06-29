import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeEnterpriseFactory } from "../../services/enterprise/enterprise.factory";

export class EnterpriseController {
	public static async create(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const enterpriseSchema = z
			.object({
			  cnpj: z
				.string()
				.min(14, { message: "CNPJ must be 14 characters long." })
				.optional(),
			  cpf: z
				.string()
				.min(11, { message: "CPF must be 11 characters long." })
				.optional(),
			  address: z.string().optional(),
			  slug: z
				.string()
				.min(3, { message: "Slug must be at least 3 characters long." }),
			})
			.refine((data) => data.cpf || data.cnpj, {
			  message: "At least one of CPF or CNPJ is required.",
			  path: ["cpf"],
			});
		  

            const { cnpj, cpf, address, slug } = enterpriseSchema.parse(req.body);

			const { organizationId } = req.user || {};

			if (!organizationId) {
				return res.status(400).json({ message: "Organization ID is required." });
			}

            const enterpriseService = makeEnterpriseFactory();

            const result = await enterpriseService.create({ cnpj, cpf, address, slug, organizationId });

            if (result.status === 1) {
                return res.status(200).json({ message: result.message, enterprise: result.enterprise });
            } else {
				return res.status(400).json({ message: result.message });
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				return res.status(400).json({
					message: "Validation error.",
					errors: err.errors,
				});
			}

			return next(err);
		}
	}
}
