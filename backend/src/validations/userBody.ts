
import { z } from "zod";


export const RegisterBody = z.object({
    name: z.string()
        .min(6, { message: "name should consist atleast 6 chars"   })
        .optional(),
    email: z.string()
        .email({message: "email should be of correct format"}),
    password: z.string()
    .min(6, { message:"password should consist of atleast 6 chars "  })
    })

export const LoginBody = z.object({
    email: z.string()
        .email({message: "email should be of correct format"}),
    password: z.string()
    .min(6, { message:"password should consist of atleast 6 chars "  })
    })

