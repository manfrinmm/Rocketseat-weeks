require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const routes = require("./routes");

class App {
  constructor() {
    this.httpServer = express();
    this.server = require("http").Server(this.httpServer);

    this.io;
    this.connectedUsers = {};

    this.socketIo();
    this.middlewares();
    this.database();
    this.routes();
  }

  socketIo() {
    this.io = require("socket.io")(this.server);

    this.io.on("connection", socket => {
      const { user: ID_USER } = socket.handshake.query;
      // console.log(ID_USER, socket.id);
      this.connectedUsers[ID_USER] = socket.id;
      // console.log(this.connectedUsers);
    });
  }

  database() {
    mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.httpServer.use(cors());
    this.httpServer.use(express.json());
    this.httpServer.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      return next();
    });
  }

  routes() {
    this.httpServer.use(routes);
  }
}

module.exports = new App().server;
