import jwt, { Secret } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { ApiResponse } from "../types/ApiResponse";

const prisma = new PrismaClient();

const generateToken = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: 360000,
  });
  return token;
};

const signIn = async (
  userEmail: any,
  password: any
): Promise<ApiResponse<any>> => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    if (!foundUser) {
      return {
        success: false,
        status: 400,
        message: "user already registered!",
        data: null,
      };
    } else {
      const passwordCheck = await bcrypt.compare(password, foundUser.password);

      if (passwordCheck) {
        const token = generateToken(Number(foundUser.id));

        return {
          message: "Login successfull!",
          success: true,
          status: 200,
          data: { user: foundUser, token: token },
        };
      } else {
        return {
          message: "Invalid credentials!",
          success: true,
          status: 400,
          data: null,
        };
      }
    }
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

export { generateToken, signIn };
