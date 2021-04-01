var mongoose = require("mongoose");

var songSchema = new mongoose.Schema({
  _id: { type: String, alias: "encodeId" },
  title: String,
  alias: String,
  isOffical: Boolean,
  username: String,
  artistsNames: String,
  artists: [
    {
      id: String,
      name: String,
      link: String,
      spotlight: Boolean,
      playlistId: String,
    },
  ],
  isWorldWide: Boolean,
  thumbnailM: String,
  link: String,
  thumbnail: String,
  duration: Number,
  isZMA: Boolean,
  zingChoise: Boolean,
  isPrivate: Boolean,
  preRelease: Boolean,
  releaseDate: Number,
  mvlink: String,
  streamingStatus: Number,
  allowAudioAds: Boolean,
  hasLyric: Boolean,
  publicStatus: Number,
  statusCode: Number,
  statusName: String,
  uid: Number,
  uname: String,
  canEdit: Boolean,
  canDelete: Boolean,
});

const user = mongoose.model("song", songSchema);

module.exports = user;
