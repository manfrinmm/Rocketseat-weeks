const Booking = require("../models/Booking");

class BookingController {
  async store(req, res) {
    const { date } = req.body;
    const { spot_id: spot } = req.params;
    const { user_id: user } = req.headers;

    try {
      const booking = await Booking.create({ date, spot, user });

      await booking
        .populate("spot")
        .populate("user")
        .execPopulate();

      const ownewSocket = req.connectedUsers[booking.spot.user];

      if (ownewSocket) {
        req.io.to(ownewSocket).emit("booking_request", booking);
      }

      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar booking" });
    }
  }
}

module.exports = new BookingController();
