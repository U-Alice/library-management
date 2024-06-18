import express, { RequestHandler } from 'express';
import { createAccount, getUsersController } from '../controllers/userController';
import { authorization } from '../controllers/auth';

const router = express.Router();

router.get("/getAll", authorization as RequestHandler, getUsersController);
router.post("/createAccount", createAccount);

export default router;