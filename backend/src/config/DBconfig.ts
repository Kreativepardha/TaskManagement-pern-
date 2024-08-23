import { PrismaClient } from "@prisma/client";



export const Prisma = new PrismaClient({
    log:["error", "info"],
    errorFormat:"pretty",
})
