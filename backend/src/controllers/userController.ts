import { Request, Response } from "express"
import { RegisterBody } from "../validations/userBody"

export const Register = async (req: Request, res: Response) => {
    const result = RegisterBody.safeParse(req.body)
        if(!result.success) {
            return
        }

}



export const Login = async (req: Request, res: Response) => {

}