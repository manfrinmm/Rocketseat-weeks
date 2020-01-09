const Dev = require("../models/Dev");

class LikeController {
  async store(req, res) {
    const { io, connectedUsers } = req;

    console.log(io, connectedUsers);
    const { user } = req.headers;
    const { id } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(id);

    if (!targetDev) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = connectedUsers[loggedDev._id];
      const targetSocket = connectedUsers[targetDev._id];

      if (loggedSocket && targetSocket) {
        io.to(loggedSocket).emit("match", targetDev);
        io.to(targetSocket).emit("match", loggedDev);
      }
    }
    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    return res.json(loggedDev);
  }
}

module.exports = new LikeController();
