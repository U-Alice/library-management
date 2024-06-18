import { Book } from "@prisma/client";
import { registerBookValidation } from "../utils/validation";
import { prisma } from "../utils/db";
import { ApiResponse } from "../types/ApiResponse";

export const createBook = async (
  newBook: any
): Promise<ApiResponse<Book | String | null>> => {
  try {
    
    const { error } = registerBookValidation(newBook);
    if (error)
      return {
        success: false,
        status: 400,
        message: "validation error" + error.details[0].message,
        data: null,
      };

    let foundBook = await prisma.book.findFirst({
      where: { name: newBook.name, author: newBook.author },
    });

    if (foundBook) {
      return {
        success: false,
        status: 400,
        message: "Book already registered!",
        data: null,
      };
    }
    const createBook = await prisma.book.create({
      data: {
        name: newBook.name,
        author: newBook.author,
        publisher: newBook.publisher,
        publicationYear: newBook.publicationYear,
        subject: newBook.subject
      
      },
    });
    let apiResponse: ApiResponse<Book> = {
      message: "Book registered successfully!",
      success: true,
      status: 201,
      data: createBook,
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

export const getAllBooks= async (): Promise<ApiResponse<Book[] | null>> => {
  try {
    const books = await prisma.book.findMany();
    let apiResponse: ApiResponse<Book[]> = {
      message: "Data retrieved successfully!",
      success: true,
      status: 200,
      data: books,
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

export const updateBook = async (
  book: any,
  id: number
): Promise<ApiResponse<Book | String | null>> => {
  try {
    const { error } = registerBookValidation(book);
    if (error)
      return {
        success: false,
        status: 400,
        message: "validation error" + error.details[0].message,
        data: null,
      };

    let foundBook = await prisma.book.findFirst({
      where: { id: id },
    });

    if (!foundBook) {
      return {
        success: false,
        status: 400,
        message: "Book not found!",
        data: null,
      };
    }
    const Book = await prisma.book.update({
      where:{
        id : id
      },
      data: {
        name: foundBook.name,
        author: foundBook.author,
        publisher: foundBook.publisher,
        publicationYear: foundBook.publicationYear,
        subject: foundBook.subject
      },
    });
    let apiResponse: ApiResponse<Book> = {
      message: "Book updated successfully!",
      success: true,
      status: 201,
      data: foundBook,
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

export const deleteBook = async (id: number): Promise<ApiResponse<Book | String | null>> =>{
  try{
    const newBook = await prisma.book.delete({
      where: {
        id:  id
      }
    })
    let apiResponse: ApiResponse<null> = {
      message: "Data removed successfully!",
      success: true,
      status: 200,
    };
    return apiResponse;
  }catch(err:any){
    let apiResponse: ApiResponse<null> = {
      message: err.message,
      success: true,
      status: 500,
    };
    console.log(err);
    return apiResponse;
  }
} 