import express from "express";
import { signInController } from "../controllers/authController";

const router = express.Router();

router.post("/login", signInController);

export default router;
