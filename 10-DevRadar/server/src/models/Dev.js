const mongoose = require("mongoose");
const PointSchmea = require("./utils/PointSchema");

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchmea,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Dev", DevSchema);
