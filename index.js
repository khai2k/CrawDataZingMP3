const mongoose = require("mongoose");
const ZingMp3 = require("./modules/ZingMp3");
const SongModel = require("./models/song");
const ArstistModel = require("./models/artist");
const abc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

mongoose.connect("mongodb://localhost:27018/zingmp3", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log(`connected succsesfull`);
});

var insertDB = (items, type) => {
  items.map((item) => {
    if (type == "song") SongModel.create(item);
    else ArstistModel.create(item);
  });
};

async function fetchAndInsert(type) {
  let count = 100;
  for (let character of abc) {
    let page = 1;
    while (true) {
      console.log(page);
      let data = await ZingMp3.search(character, type, page, count);
      if (!data.items) break;
      insertDB(data.items, type);
      page++;
    }
  }
  return;
}
module.exports = fetchAndInsert;
