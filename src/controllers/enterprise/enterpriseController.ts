import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { makeEnterpriseFactory } from '../../services/enterprise/enterpriseFactory';

export class EnterpriseController {
	public static async create(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const enterpriseSchema = z
				.object({
			  cnpj: z
						.string()
						.min(14, { message: 'CNPJ must be 14 characters long.' })
						.optional(),
			  cpf: z
						.string()
						.min(11, { message: 'CPF must be 11 characters long.' })
						.optional(),
			  address: z.string().optional(),
			  slug: z
						.string()
						.min(3, { message: 'Slug must be at least 3 characters long.' }),
				})
				.refine((data) => data.cpf || data.cnpj, {
			  message: 'At least one of CPF or CNPJ is required.',
			  path: ['cpf'],
				});
		  

			const { cnpj, cpf, address, slug } = enterpriseSchema.parse(req.body);

			const { organizationId } = req.user || {};

			if (!organizationId) {
				return res.status(400).json({ message: 'Organization ID is required.' });
			}

			const enterpriseService = makeEnterpriseFactory();

			const result = await enterpriseService.create({ cnpj, cpf, address, slug, organizationId, active: true });

			if (result.status === 1) {
				return res.status(200).json({ message: result.message, enterprise: result.enterprise });
			} else {
				return res.status(400).json({ message: result.message });
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				return res.status(400).json({
					message: 'Validation error.',
					errors: err.errors,
				});
			}

			return next(err);
		}
	}

	public static async list(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { organizationId } = req.user || {};

			if (!organizationId) {
				return res.status(400).json({ message: 'Organization ID is required.' });
			}

			const enterpriseService = makeEnterpriseFactory();

			const enterprises = await enterpriseService.list(organizationId);

			return res.status(200).json({ enterprises });
		} catch (err) {
			return next(err);
		}
	}

	public static async getById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id } = req.params;

			if (!id || isNaN(Number(id))) {
				return res.status(400).json({ message: 'Invalid enterprise ID.' });
			}

			const enterpriseService = makeEnterpriseFactory();

			const enterprise = await enterpriseService.getById(Number(id));

			if (!enterprise) {
				return res.status(404).json({ message: 'Enterprise not found.' });
			}

			return res.status(200).json({ enterprise });
		} catch (err) {
			return next(err);
		}
	}

	public static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const enterpriseSchema = z.object({
				cnpj: z
				  .string()
				  .min(14, { message: 'CNPJ must be 14 characters long.' })
				  .nullable()
				  .optional(),
				cpf: z
				  .string()
				  .min(11, { message: 'CPF must be 11 characters long.' })
				  .nullable()
				  .optional(),
				address: z.string().optional(),
				slug: z
				  .string()
				  .min(3, { message: 'Slug must be at least 3 characters long.' }),
				active: z.boolean().optional().default(true),
			  }).superRefine((data, ctx) => {
				const hasCPF = !!data.cpf;
				const hasCNPJ = !!data.cnpj;
			  
				if (hasCPF && hasCNPJ) {
				  ctx.addIssue({
					path: ['cpf'],
					code: z.ZodIssueCode.custom,
					message: 'Only one of CPF or CNPJ should be provided, not both.',
				  });
				  ctx.addIssue({
					path: ['cnpj'],
					code: z.ZodIssueCode.custom,
					message: 'Only one of CPF or CNPJ should be provided, not both.',
				  });
				}
			  
				if (!hasCPF && !hasCNPJ) {
				  ctx.addIssue({
					path: ['cpf'],
					code: z.ZodIssueCode.custom,
					message: 'You must provide either a valid CPF or a valid CNPJ.',
				  });
				}
			  });

			const { cnpj, cpf, address, slug, active } = enterpriseSchema.parse(req.body);

			const { id } = req.params;

			if (!id || isNaN(Number(id))) {
				return res.status(400).json({ message: 'Invalid enterprise ID.' });
			}

			const { organizationId } = req.user || {};
			if (!organizationId) {
				return res.status(400).json({ message: 'Organization ID is required.' });
			}

			const enterpriseService = makeEnterpriseFactory();

			const result = await enterpriseService.update({
				id: Number(id),
				cnpj: cnpj ?? undefined,
				cpf: cpf ?? undefined,
				address,
				active,
				slug,
				organizationId,
			});

			if (result.status === 1) {
				return res.status(200).json({ message: result.message, enterprise: result.enterprise });
			} else {
				return res.status(400).json({ message: result.message });
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				return res.status(400).json({
					message: 'Validation error.',
					errors: err.errors,
				});
			}

			return next(err);
		}
	}
}
