import { Router } from "express";

import multer from "multer";

import multerConfig from "./config/multer";
import BoxController from "./controllers/BoxController";
import FileController from "./controllers/FileController";

const routes = Router();

const uploadConfig = multer(multerConfig);

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
  "/boxes/:id/files",
  uploadConfig.single("file"),
  FileController.store,
);

export default routes;
