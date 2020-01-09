const Spot = require("../models/Spot");
const User = require("../models/User");

class SpotController {
  async index(req, res) {
    const { tech } = req.query;
    console.log(tech);
    const spots = await Spot.find({ techs: tech });

    res.json(spots);
  }

  async store(req, res) {
    const { filename: thumbnail } = req.file;
    const { company, price, techs } = req.body;
    const { user_id: user } = req.headers;

    const checkUser = await User.findById(user);

    if (!checkUser) {
      res.status(400).json({ message: "Usuário não encontrado" });
    }
    const spot = await Spot.create({
      user,
      company,
      price,
      techs: techs.split(",").map(tech => tech.trim()),
      thumbnail
    });

    res.status(201).json(spot);
  }

  /* NÃO FINALIZADO
  async update(req, res) {
    const { id } = req.params;
    const { filename: thumbnail } = req.file;
    console.log(req.file);
    const data = {
      ...req.body,
      techs: techs.split(",").map(tech => tech.trim())
    };

    try {
      const spot = await Spot.findByIdAndUpdate(id, data, { new: true });
      return res.status(200).json(spot);
    } catch (error) {
      return res.status(404).json({ message: "Spot não encontrado" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Spot.findByIdAndRemove(id);
      return res.status(200).json({ message: "Spot excluido." });
    } catch (error) {
      return res.status(404).json({ message: "Spot não encontrado" });
    }
  }*/
}

module.exports = new SpotController();
