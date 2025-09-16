import { Router } from "express";
import { castVote } from "../controllers/voteController.js";

const router = Router();

router.post("/", castVote);   // POST /api/votes

export default router;
