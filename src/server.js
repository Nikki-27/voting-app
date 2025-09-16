import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

// Create an HTTP server using the Express app.
// This allows us to attach Socket.IO on top of the same server instance.
const server = http.createServer(app);

// Initialize Socket.IO for real-time communication.
// CORS is set to "*" so clients from any origin can connect.
const io = new Server(server, { cors: { origin: "*" } });

// Make the Socket.IO instance available in Express controllers
// (via req.io). This lets REST endpoints trigger WebSocket events.
app.set("io", io);

/**
 * -----------------------------
 * WebSocket Event Handlers
 * -----------------------------
 */
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // Client requests to "join" a specific poll room.
  // Rooms are scoped by poll ID (e.g., poll_1, poll_2).
  // Only clients in the same room will receive updates for that poll.
  socket.on("joinPoll", (pollId) => {
    socket.join(`poll_${pollId}`);
    console.log(`👥 Client ${socket.id} joined poll_${pollId}`);
  });

  // Handle client disconnection cleanly.
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

/**
 * -----------------------------
 * Server Startup
 * -----------------------------
 * Start the HTTP + WebSocket server.
 * Uses PORT from environment variables, or defaults to 5000.
 */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
