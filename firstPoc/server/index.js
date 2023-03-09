//Import
/*const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
https://stackoverflow.com/questions/6599470/node-js-socket-io-with-ssl
*/

const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const path = require("path");
//Init express
// Create the express server
const port = process.env.PORT || 3001;
// api

app.get("/", (req, res) => {
  res.send("srv running");
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

// This will run for each new client that connects to on the socket
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

// listen
server.listen(port, () => console.log(`Server listening on port ${port}`));
