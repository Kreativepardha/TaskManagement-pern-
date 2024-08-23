import { z } from "zod";




export const taskBody = z.object({
    title: z.string()
        .min(1, { message:"Title is required" }),
    description: z.string().optional(),
    important: z.boolean().default(false),
    completed: z.boolean().default(false)
})