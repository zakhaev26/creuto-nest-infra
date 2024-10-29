import { z } from 'zod';
export declare const LocationSchema: z.ZodObject<{
    name: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    x?: number;
    y?: number;
}, {
    name?: string;
    x?: number;
    y?: number;
}>;
export type LocationDTO = z.infer<typeof LocationSchema>;
