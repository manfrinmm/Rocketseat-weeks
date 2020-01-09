const express = require("express");

const multer = require("multer");
const multerConfig = require("./config/upload");

const SessionController = require("./app/controllers/SessionController");
const SpotController = require("./app/controllers/SpotController");
const DashboardController = require("./app/controllers/DashboardController");
const BookingController = require("./app/controllers/BookingController");
const AprovalController = require("./app/controllers/AprovalController");
const RejectionController = require("./app/controllers/RejectionController");

const routes = express.Router();
const upload = multer(multerConfig);

routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

// routes.put("/spots/:id", upload.single("thumbnail"), SpotController.update);
// routes.delete("/spots/:id", SpotController.delete);

routes.get("/dashboard", DashboardController.index);

routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", AprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

module.exports = routes;
