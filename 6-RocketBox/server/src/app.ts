import express from "express";

import cors from "cors";
import { Server } from "http";
import socketIo from "socket.io";

import { pathToTmpFolder } from "./config/multer";
import routes from "./routes";

import "./database/connection";

const app = express();

app.use(cors());

// Permite o uso de JSON
app.use(express.json());

// Permite o envio de arquivo nas requisições
app.use(express.urlencoded({ extended: true }));

const server = new Server(app);
const io = socketIo(server);

io.on("connection", socket => {
  socket.on("connectionRoom", box => {
    socket.join(box);
  });
});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use("/files", express.static(pathToTmpFolder));

app.use(routes);

export default app;
