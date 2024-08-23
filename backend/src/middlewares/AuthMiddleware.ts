import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "..";
import jwt, { JwtPayload } from 'jsonwebtoken'




export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
            const authHeaders = req.headers.authorization;
            if(!authHeaders) {
                return res.status(400).json({
                    message:"Token not present"
                })
            }
            const token  = authHeaders?.split(" ")[1]
           if(!token) {
            return res.status(400).json({
                message: "token is null"
            })
           }

            try {
                const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload
                req.user = decoded 
                next()
            } catch (err :any) {
                return res.status(401).json({
                    message:"Invalid token",
                    error: err.message
                })
            }
    }