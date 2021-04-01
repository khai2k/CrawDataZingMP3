var mongoose = require("mongoose");

var artistSchema = new mongoose.Schema({
  _id: { type: String, alias: "id" },
  name: String,
  link: String,
  spotlight: Boolean,
  playlistId: String,
  cover: String,
  thumbnail: String,
  totalFollow: Number,
});

const artist = mongoose.model("artist", artistSchema);

module.exports = artist;
