import express from "express";

import DislikeController from "./controllers/DislikeController";
import LikeController from "./controllers/LikeController";
import TweetController from "./controllers/TweetController";

const routes = express.Router();

routes.get("/tweets", TweetController.index);
routes.post("/tweets", TweetController.store);

routes.post("/tweet/:id/likes", LikeController.store);
routes.post("/tweet/:id/dislikes", DislikeController.store);

export default routes;
