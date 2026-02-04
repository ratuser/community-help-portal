const Chat = require("./models/Chat");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// 1. DEFINING ALLOWED ORIGINS (No trailing slashes)
const allowedOrigins = [
  "http://localhost:5173",
  "https://community-help-portal.vercel.app" 
];

// 2. CONFIGURE CORS (MUST BE AT THE TOP)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("🚫 CORS Blocked for:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests globally
app.options("*", cors());

app.use(express.json());

// 3. INITIALIZE SERVER-SIDE SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT"],
    credentials: true
  },
});

// PASS IO TO ROUTES (Middleware)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// IMPORT ROUTES
const contactRoutes = require("./routes/contactRoutes");
const helpRequestRoutes = require("./routes/helpRequestRoutes");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chatRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profile");

// SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("sendMessage", async ({ chatId, senderId, text }) => {
    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: { sender: senderId, text: text }
          }
        },
        { new: true }
      );

      const newMessage = updatedChat.messages[updatedChat.messages.length - 1];

      io.to(chatId).emit("receiveMessage", {
        _id: newMessage._id,
        senderId: senderId,
        text: text,
        createdAt: newMessage.createdAt
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/requests", helpRequestRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/contact", contactRoutes);

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error: ", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));