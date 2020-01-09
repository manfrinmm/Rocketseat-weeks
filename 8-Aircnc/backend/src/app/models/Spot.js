const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    thumbnail: {
      type: String
    },
    company: {
      type: String,
      required: true
    },
    price: Number,
    techs: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

SpotSchema.virtual("thumbnail_url").get(function() {
  return `${process.env.APP_URL}/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);
