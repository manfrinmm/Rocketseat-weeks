import express from "express";
import { resolve } from "path";
import nunjucks from "nunjucks";

import routes from "./routes";

const server = express();

server.use(express.urlencoded({ extended: true }));

const pathViews = resolve(__dirname, "..", "..", "web", "pages");
const publicPath = resolve(__dirname, "..", "..", "web");

server.set("view engine", "njk");
nunjucks.configure(pathViews, {
  express: server,
  noCache: true
});

server.use(routes);
server.use(express.static(publicPath));

export default server;
