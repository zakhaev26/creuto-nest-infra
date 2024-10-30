import { z } from 'zod';
import { Types } from 'mongoose';

export const createUserDTO = z.object({
  name: z.string().optional(),
  organization: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid organization ID',
    })
    .optional(),
  location: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid location ID',
    }),
  createdBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid creator ID',
    })
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deleted: z.boolean().optional().default(false),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export const patchUserDTO = z.object({
  name: z.string().optional(),
  organization: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid organization ID',
    })
    .optional(),
  location: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid location ID',
    })
    .optional(),
  updatedAt: z.date().optional(),
  deleted: z.boolean().optional(),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export const removeUserDTO = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

// Export the types
export type CreateUserDTO = z.infer<typeof createUserDTO>;
export type PatchUserDTO = z.infer<typeof patchUserDTO>;
export type RemoveUserDTO = z.infer<typeof removeUserDTO>;
