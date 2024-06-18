import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

 interface IUserRequest extends Request {
  user: any;
}

 const authorization = (req: IUserRequest, res : Response, next:NextFunction)=>{
        try{
            const authorization =  req.headers.authorization as string
            if(!authorization)
                return res.json({message: "User not logged-in!"}).status(403)
            const token: string = authorization.split(" ")[1] as string
        if(!token ){
            res.json({message:"User not authorized, please sign in"}).status(403)
        }else{
            const decoded = jwt.verify(token , process.env.JWT_SECRET as Secret)
            req.user = decoded as unknown as string
            return next()
        }
    }catch(err){
        console.log(err)
        res.json({message: 'User not logged In'}).status(401)
    }
}
export {IUserRequest, authorization}
