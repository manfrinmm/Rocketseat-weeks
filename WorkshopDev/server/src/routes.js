import { Router } from "express";

import ideaController from "./app/controllers/ideaController";

const routes = Router();

routes.get("/", ideaController.lastIdeas);

routes.get("/ideias", ideaController.index);

routes.post("/idea", ideaController.store);

routes.get("/delete/:id", ideaController.delete);

export default routes;
