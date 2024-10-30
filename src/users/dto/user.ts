import { z } from 'zod';
import { Types } from 'mongoose';

export const createUserDTO = z.object({
  name: z.string().optional(),
  organization: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid organization ID',
  }).optional(),
  location: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid location ID',
  }),
});

export const patchUserDTO = z.object({
  name: z.string().optional(),
  organization: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid organization ID',
  }).optional(),
  location: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid location ID',
  }).optional(),
});

export const removeUserDTO = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
});


// Export the types
export type CreateUserDTO = z.infer<typeof createUserDTO>;
export type PatchUserDTO = z.infer<typeof patchUserDTO>;
export type RemoveUserDTO = z.infer<typeof removeUserDTO>;