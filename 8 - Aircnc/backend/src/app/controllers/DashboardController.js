const Spot = require("../models/Spot");

class DashboardController {
  async index(req, res) {
    const { user_id: user } = req.headers;

    const spots = await Spot.find({ user });
    res.json(spots);
  }
}

module.exports = new DashboardController();
