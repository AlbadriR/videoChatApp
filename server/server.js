import cors from "cors";
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = 3001;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

io.on("connection", (socket) => {});

server.listen(port, () => console.log(`server is running on port ${port}`));
