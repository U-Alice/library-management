import { Request, Response } from "express";
import { signIn } from "../services/authService";
import { ApiResponse } from "../types/ApiResponse";

const signInController = async (req: Request, res: Response) => {
    try {
      const apiResponse: ApiResponse<any> = await signIn(
        req.body.email,
        req.body.password
      );
      return res.status(apiResponse.status).json(apiResponse);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


export { signInController };
