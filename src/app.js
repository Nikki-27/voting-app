import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";

const app = express();

/**
 * -----------------------------
 * Global Middleware
 * -----------------------------
 */

// Enable Cross-Origin Resource Sharing so that
// frontend clients (React, plain HTML, etc.) can
// call this API even if hosted on a different domain/port.
app.use(cors());

// Parse all incoming requests with JSON payloads.
// Required for reading `req.body` in controllers.
app.use(express.json());

// Attach the Socket.IO instance (injected from server.js)
// to every incoming request. This allows controllers
// (e.g., votes) to emit real-time updates via `req.io`.
app.use((req, res, next) => {
  req.io = app.get("io");
  next();
});

/**
 * -----------------------------
 * API Routes
 * -----------------------------
 */

// User management (create, fetch)
app.use("/api/users", userRoutes);

// Poll management (create poll, fetch poll with options/votes)
app.use("/api/polls", pollRoutes);

// Voting (cast a vote, trigger WebSocket updates)
app.use("/api/votes", voteRoutes);

/**
 * -----------------------------
 * Health Check
 * -----------------------------
 * Simple endpoint to verify that the API is up and running.
 * Useful for deployment checks or uptime monitoring.
 */
app.get("/", (req, res) => {
  res.send("✅ Real-Time Polling API is running");
});

export default app;
