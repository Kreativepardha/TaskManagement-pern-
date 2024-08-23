import rateLimit from "express-rate-limit";



export const  limiter = rateLimit({
    windowMs: 60 * 60 * 100,
    limit: 1,
})