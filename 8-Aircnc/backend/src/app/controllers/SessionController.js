const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const { email } = req.body;
    console.log(email);
    try {
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ email });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao criar na sessão" });
    }
  }
}

module.exports = new SessionController();
