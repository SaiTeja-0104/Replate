const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models/db.js");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:5173", 
    "https://replate-mauve.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
    "http://localhost:5173", 
    "https://replate-mauve.vercel.app/"
    ],
    methods: ["GET", "POST"],
  }
});


app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.conversation).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


const userRoutes = require("./routes/UserRoutes.js");
const donationRoutes = require("./routes/DonationRoutes.js");
const ngoRoutes = require("./routes/NgoRoutes.js");
const donorRoutes = require("./routes/DonorRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

app.use("/user", userRoutes);
app.use("/ngo", ngoRoutes);
app.use("/donation", donationRoutes);
app.use("/donor", donorRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});