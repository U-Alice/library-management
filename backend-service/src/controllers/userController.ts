import { Request, Response } from "express";
import { createUser, getAllUsers, updateUser } from "../services/userService";
import { ApiResponse } from "../types/ApiResponse";
import { User } from "../types/User";
import { IUserRequest } from "./auth";

export const createAccount = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const apiResponse: ApiResponse<User | String | null> = await createUser(newUser);
     
    return res.status(apiResponse.status).json(apiResponse);

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;

  try {
    const apiResponse: ApiResponse<User | String | null> = await updateUser(
      body, Number(id)
    );

    return res.status(apiResponse.status).json(apiResponse);

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const apiResponse: ApiResponse<User[] | null> = await getAllUsers();
   return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {  
   return res.status(500).json({ error: "Internal Server Error" });
  }
};