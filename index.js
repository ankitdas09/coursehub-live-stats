const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            "https://coursehubiitg.in",
            "https://www.coursehubiitg.in",
            "http://localhost:5173",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
let userCount = 0;
let totalUserCount = 0;

io.on("connection", (socket) => {
    userCount++;
    totalUserCount++;
    socket.on("disconnect", () => {
        userCount--;
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Hello admin!",
        liveUserCount: userCount,
        totalUserCount: totalUserCount,
    });
});

server.listen(3000, () => {
    console.log("Server on 3000");
});
