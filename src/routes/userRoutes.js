import { Router } from "express";
import { createUser, getUser } from "../controllers/userController.js";

const router = Router();

router.post("/", createUser);   // POST /api/users
router.get("/:id", getUser);    // GET /api/users/:id

export default router;

