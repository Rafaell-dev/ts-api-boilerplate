import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { makeUserFactory } from '../../services/user/userFactory';

export class UserController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userSchema = z.object({
                name: z.string().min(1, 'Name is required'),
                email: z.string().email('Invalid email format'),
                password: z.string().min(6, 'Password must be at least 6 characters long'),
            });

            const { name, email, password } = userSchema.parse(req.body);

            const { organizationId } = req.user || {};

            if (!organizationId) {
                return res.status(400).json({ message: 'Organization ID is required.' });
            }

            const userService = makeUserFactory();

            const result = await userService.create({ name, email, password, organizationId });

            if (result.status === 1) {
                return res.status(201).json({ message: result.message, user: result.user });
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

    public static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required.' });
            }

            const userSchema = z.object({
                name: z.string().min(1, 'Name is required').optional(),
                email: z.string().email('Invalid email format').optional(),
                password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
            }).refine((data) => {
                return data.name || data.email || data.password;
            }, {
                message: 'At least one field must be provided',
            });
            
            const updates = userSchema.parse(req.body);

            const userService = makeUserFactory();

            const result = await userService.update({ id: parseInt(userId, 10), ...updates });

            if (result.status === 1) {
                return res.status(200).json({ message: result.message, user: result.user });
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

            const userService = makeUserFactory();

            const result = await userService.list(organizationId);

            if (result.status === 1) {
                return res.status(200).json({ users: result.user });
            } else {
                return res.status(400).json({ message: result.message });
            }
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
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required.' });
            }

            const userService = makeUserFactory();

            const result = await userService.getById(parseInt(userId, 10));

            if (result.status === 1) {
                return res.status(200).json({ user: result.user });
            } else {
                return res.status(404).json({ message: result.message });
            }
        } catch (err) {
            return next(err);
        }
    }
}