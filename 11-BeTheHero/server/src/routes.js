import { Router } from "express";

/**
 * Controllers
 */
import IncidentController from "./app/controllers/IncidentController";
import OngController from "./app/controllers/OngController";
import OngIncidentsController from "./app/controllers/OngIncidentsController";
import SessionController from "./app/controllers/SessionController";
/**
 * Validators
 */
import incidentControllerValidator from "./app/validators/incidentControllerValidator";
import ongControllerValidator from "./app/validators/ongControllerValidator";
import ongIncidentsControllerValidator from "./app/validators/ongIncidentsControllerValidator";
import sessionControllerValidator from "./app/validators/sessionControllerValidator";

const routes = Router();

routes.post(
  "/sessions",
  sessionControllerValidator.store,
  SessionController.store
);

routes.get("/ongs", OngController.index);
routes.post("/ongs", ongControllerValidator.store, OngController.store);

routes.get(
  "/incidents",
  ongIncidentsControllerValidator.index,
  IncidentController.index
);

routes.use(ongControllerValidator.session);

routes.get("/ongs/incidents", OngIncidentsController.index);

routes.post(
  "/incidents",
  ongIncidentsControllerValidator.store,
  IncidentController.store
);
routes.delete(
  "/incidents/:id",
  incidentControllerValidator.destroy,
  IncidentController.delete
);

export default routes;
