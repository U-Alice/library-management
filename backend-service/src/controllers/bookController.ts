import { Request, Response } from "express";
import { ApiResponse } from "../types/ApiResponse";
import { createBook, deleteBook, getAllBooks, updateBook } from "../services/bookService";
import { Book } from "@prisma/client";

export const createBookController = async (req: Request, res: Response) => {
  const newBook = req.body;
  try {
    const apiResponse: ApiResponse<Book | String | null> = await createBook(
      newBook
    );

    return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBookController = async (req: Request, res: Response) => {
  const newBook = req.body;
  const id = Number(req.params.id);
  try {
    const apiResponse: ApiResponse<Book | String | null> =
      await updateBook(newBook, id);

    return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteBookController = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const apiResponse: ApiResponse<Book | String | null> =
      await deleteBook(Number(id));

    return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getBooksController = async (req: Request, res: Response) => {
  try {
    const apiResponse: ApiResponse<Book[] | null> = await getAllBooks();
    return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
