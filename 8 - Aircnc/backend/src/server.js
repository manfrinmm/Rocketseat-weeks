require("dotenv/config");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");

const routes = require("./routes");
const path = require("path");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aircnc:123@cluster0-dca1o.mongodb.net/aircnc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(process.env.APP_PORT || 3333);
