const api = require("../services/api");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    try {
      const devs = await Dev.find();

      return res.status(200).json(devs);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    try {
      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const { data } = await api.get(`/users/${github_username}`);

        const { name = login, avatar_url, bio } = data;

        const techsArray = parseStringAsArray(techs);

        const location = {
          type: "Point",
          coordinates: [longitude, latitude]
        };

        dev = await Dev.create({
          name,
          github_username,
          avatar_url,
          bio,
          techs: techsArray,
          location
        });

        //Filtrar as conexões que estão dentro da máxima distância
        // e que pelos um novo dev tenha as tecnologias
        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          techsArray
        );

        sendMessage(sendSocketMessageTo, "new-dev", dev);
      }

      return res.status(200).json(dev);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};
