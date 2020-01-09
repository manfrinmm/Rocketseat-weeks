const { Router } = require("express");
const routes = new Router();

const DevController = require("./App/controllers/DevController");
const LikeController = require("./App/controllers/LikeController");
const DislikeController = require("./App/controllers/DislikeController");

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

routes.post("/devs/:id/likes", LikeController.store);
routes.post("/devs/:id/dislikes", DislikeController.store);

module.exports = routes;
