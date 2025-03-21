import {z} from 'zod';

export const createUserSchema = z.object({
    name: z.string().trim().nonempty("Name must not be empty"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string().email("Invalid email format")
});