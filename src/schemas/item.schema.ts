import {z} from 'zod';

export const createItemSchema = z.object({
    name: z.string().trim().nonempty("Name must not be empty"),
    category: z.string().trim().nonempty("Category must not be empty"),
    stock: z.number().nonnegative("Stock must be positive integer")
});