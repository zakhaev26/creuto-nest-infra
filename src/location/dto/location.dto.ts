import { z } from 'zod';

export const LocationCreateSchema = z.object({
  name: z
    .string()
    .min(5, 'too short location name!')
    .max(10, 'too big location name!'),
  x: z.number(),
  y: z.number(),
});

// Create a TypeScript type from the Zod schema
export type LocationCreateDTO = z.infer<typeof LocationCreateSchema>;
