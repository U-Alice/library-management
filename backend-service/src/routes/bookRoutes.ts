import express, { RequestHandler } from "express";

import { authorization } from "../controllers/auth";
import { createBookController, deleteBookController, getBooksController, updateBookController } from "../controllers/bookController";

const router = express.Router();

router.get("/getAll", authorization as RequestHandler, getBooksController);
router.post("/create", authorization as RequestHandler, createBookController);
router.put("/update/:id", authorization as RequestHandler, updateBookController);
router.delete("/delete/:id",authorization as RequestHandler, deleteBookController);

export default router;
