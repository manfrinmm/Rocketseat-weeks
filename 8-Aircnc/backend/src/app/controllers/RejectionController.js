const Booking = require("../models/Booking");

class RejectionController {
  async store(req, res) {
    const { booking_id } = req.params;

    try {
      const booking = await Booking.findById(booking_id).populate("spot");

      booking.approved = false;

      await booking.save();

      const bookingUserSocket = req.connectedUsers[booking.user];

      if (bookingUserSocket) {
        req.io.to(bookingUserSocket).emit("booking_response", booking);
      }

      return res.json(booking);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao rejeitar" });
    }
  }
}

module.exports = new RejectionController();
