import { Router } from "express";
import { createPoll, getPoll } from "../controllers/pollController.js";

const router = Router();

router.post("/", createPoll);   // POST /api/polls
router.get("/:id", getPoll);    // GET /api/polls/:id

export default router;
