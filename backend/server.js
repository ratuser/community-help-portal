const Chat = require("./models/Chat");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);


const allowedOrigins = [
  "http://localhost:5173",          // Vite Local
  process.env.FRONTEND_URL          // Your future Vercel URL
];

app.use(express.json());


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy violation"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT"],
    credentials: true
  },
});


const contactRoutes = require("./routes/contactRoutes");
const helpRequestRoutes = require("./routes/helpRequestRoutes");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chatRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profile");


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


app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use("/api/auth", authRoutes);
app.use("/api/requests", helpRequestRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/contact", contactRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error: ", err));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));