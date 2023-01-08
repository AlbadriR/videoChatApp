require("dotenv").config();
const cors = require("cors");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true, // allowEIO3 is set to true to communicate with socket.io-client v2
});
const port = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  // Lorsqu'un utilisateur rejoint une room
  socket.on("join room", (roomId) => {
    // Rejoindre la room
    socket.join(roomId);
    // Récupérer la liste des sockets dans la room
    const clients = io.sockets.adapter.rooms.get(roomId);
    console.log(clients);
    // Vérifie si il y a 2 utilisateurs dans la room
    if (socket.client.conn.server.clientsCount === 2) {
      // Si il y a 2 utilisateurs dans la room, on supprime notre propre id donc il ne reste que l'id de l'autre utilisateur dans "clients"
      clients.delete(socket.id);
      // Récupérer l'id de l'autre utilisateur
      const otherUserSocketId = clients.values().next().value;
      console.log(otherUserSocketId);
      // Envoyer l'ID de socket de l'autre utilisateur au front-end
      socket.emit("other user", otherUserSocketId);
      // Notifier l'autre utilisateur
      io.to(otherUserSocketId).emit("user joined", socket.id);
    }
  });
  // The payload contains who calls, who is called and the sdp
  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });

  // Lorsqu'un utilisateur quitte la room
  socket.on("leave room", (roomId) => {
    console.log(`User left room: ${roomId}`);
    socket.leave(roomId);
  });

  // Lorsqu'un utilisateur se déconnecte
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnect`);
  });
  if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
  }
});
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send("Une erreur est survenue");
});

server.listen(port, () => console.log(`server is running on port ${port}`));
