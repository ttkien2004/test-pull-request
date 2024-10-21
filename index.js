const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const jsonServer = require("json-server");
require("dotenv").config();

app.use(cors());

app.use(express.json());

// create server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// const io = new Server(server);
// const p2p = require('socket.io-p2p-server').Server;
// io.use(p2p);

// Listen to an event
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // receive an event called send_message
  socket.on("send_message", (data) => {
    // console.log(data);
    socket.broadcast.emit("receive_message", data);
    // socket.to("101").emit("receive_message", data);
  });
});

// Set default router

server.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
