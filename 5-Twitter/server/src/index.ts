import express from "express";

import cors from "cors";
import { Server } from "http";
import socket from "socket.io";

import routes from "./routes";

// db connection
import "./database/connection";

const app = express();

const server = new Server(app);

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());

app.use(cors());
app.use(routes);

server.listen(3333, () => {
  console.log("Server started on port 3333 🚀");
});
