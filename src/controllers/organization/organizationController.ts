import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { makeOrganizationFactory } from '../../services/organization/organizationFactory';

export class OrganizationController {
	public static async create(
		req: Request,
		res: Response,
		next: NextFunction
	) {
        try {
            const organizationSchema = z.object({
                slug: z.string().min(1, 'Slug is required'),
                description: z.string().optional(),
            });

            const { slug, description } = organizationSchema.parse(req.body);

            const organizationService = makeOrganizationFactory();

            const result = await organizationService.create({
                slug,
                description
            });

            if (result.status === 1) {
                return res.status(201).json({ message: result.message, organization: result.organization });
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

    public static async getByID(req: Request, res: Response, next: NextFunction) {
        try{
            const organizationId = req.params.id;

            if (!organizationId) {
                return res.status(400).json({ message: 'Organization ID is required.' });
            }

            const organizationService = makeOrganizationFactory();

            const result = await organizationService.getByID(parseInt(organizationId, 10));

            if (result.status === 1) {
                return res.status(200).json({ organization: result.organization });
            } else {
                return res.status(404).json({ message: result.message });
            }
        } catch (err) {
            return next(err);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationSchema = z.object({
                slug: z.string().optional(),
                description: z.string().optional(),
                active: z.boolean().optional(),
            }).refine((data) => {
                return data.active || data.description || data.slug;
            }, {
                message: 'At least one field must be provided',
            });

            const { slug, description, active } = organizationSchema.parse(req.body);

            const { id } = req.params;

            if (!id ||isNaN(Number(id))) {
                return res.status(400).json({ message: 'Valid organization ID is required.' });
            }

            const organizationService = makeOrganizationFactory();

            const result = await organizationService.update({
                id: parseInt(id, 10),
                slug,
                active,
                description
            });

            if (result.status === 1) {
                return res.status(200).json({ message: result.message, organization: result.organization });
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