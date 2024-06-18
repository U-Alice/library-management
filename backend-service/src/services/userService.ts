import bcrypt from "bcrypt";
import { createUserValidation } from "../utils/validation";
import { prisma } from "../utils/db";
import { ApiResponse } from "../types/ApiResponse";
import { User } from "@prisma/client";

export const createUser = async (
  user: any
): Promise<ApiResponse<User | String | null>> => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const { error } = createUserValidation(user);
    if (error)
      // return { message: "validation error" + error.details[0].message }
      return {
        success: false,
        status: 400,
        message: "validation error" + error.details[0].message,
        data: null,
      };

    let foundUser = await prisma.user.findFirst({
      where: { email: user.email },
    });

    if (foundUser) {
      return {
        success: false,
        status: 400,
        message: "user already registered!",
        data: null,
      };
    }
    const newUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
      },
    });
    let apiResponse: ApiResponse<User> = {
      message: "User created successfully!",
      success: true,
      status: 201,
      data: newUser,
    };
    return apiResponse;
  } catch (err: any) {
    let apiResponse: ApiResponse<null> = {
      message: err.message,
      success: true,
      status: 500,
    };
    console.log(err);
    return apiResponse;
  }
};

export const getAllUsers = async (): Promise<ApiResponse<User[] | null>> => {
  try {
    const users = await prisma.user.findMany();
    let apiResponse: ApiResponse<User[]> = {
      message: "Data retrieved successfully!",
      success: true,
      status: 200,
      data: users,
    };
    return apiResponse;
  } catch (err:any) {
     let apiResponse: ApiResponse<null> = {
       message: err.message,
       success: true,
       status: 500,
     };
     console.log(err);
     return apiResponse;
  }
};

export const updateUser = async (
  updatedUser: Partial<User>,
  id: number
 
): Promise<ApiResponse<User | null>> => {
  try {
    const { error } = createUserValidation(updatedUser);
    if (error)
      return {
        success: false,
        status: 400,
        message: "Validation error: " + error.details[0].message,
        data: null,
      };

    const user = await prisma.user.update({
      where: { id },
      data: updatedUser,
    });

    let apiResponse: ApiResponse<User> = {
      message: "User updated successfully!",
      success: true,
      status: 200,
      data: user,
    };
    return apiResponse;
  } catch (err: any) {
    let apiResponse: ApiResponse<null> = {
      message: err.message,
      success: false,
      status: 500,
    };
    console.log(err);
    return apiResponse;
  }
};
