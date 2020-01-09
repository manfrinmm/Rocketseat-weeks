const Dev = require("../models/Dev");

const api = require("../../services/api");

class DevController {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users);
  }

  async store(req, res) {
    const { username: user } = req.body;

    const userExists = await Dev.findOne({ user });

    if (userExists) {
      return res.json(userExists);
    }

    try {
      const { data } = await api.get(`users/${user}`);

      const { login, name, bio, avatar_url: avatar } = data;

      /**
       * name: name || login,
       * Fiz isso caso o usuário não tenha nome
       */
      const dev = await Dev.create({
        name: name || login,
        user,
        bio,
        avatar
      });

      return res.json(dev);
    } catch (error) {
      return res.status(400).json(error.stack);
    }
  }
}

module.exports = new DevController();
