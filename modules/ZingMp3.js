let request = require("request-promise");
const { count } = require("../models/song");
const hashParam = require("./hashParam");
const URL_API = "https://zingmp3.vn";
const API_KEY = "kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw";
const SERCRET_KEY = "882QcNXV4tUZbvAsjmFOHqNC1LpcBRKW";
const COOKIE =
  "zmp3_rqid=MHwxMDEdUngOTkdUngMzYdUngMTmUsIC2fG51WeBGx8MTYxNzI1NzkyODkwOA";
const version = "1.1.5";

request = request.defaults({
  qs: {
    apiKey: API_KEY,
  },
  gzip: true,
  json: true,
});
class ZingMp3 {
  static getStreaming(id) {
    return this.requestZing({
      path: "/api/v2/song/getStreaming",
      qs: {
        id,
      },
    });
  }
  static search(key, type, page, count = 18) {
    return this.requestZing({
      path: "/api/v2/search",
      qs: {
        q: key,
        type,
        page,
        count,
      },
    });
  }
  static requestZing({ path, qs }) {
    return new Promise(async (resolve, reject) => {
      try {
        this.time = Math.floor(Date.now() / 1000);
        let sig = hashParam(path, { ...qs, ctime: this.time, version });
        const data = await request({
          uri: URL_API + path,
          qs: {
            ...qs,
            ctime: this.time,
            version,
            sig,
          },
          headers: {
            Cookie: COOKIE,
          },
        });

        if (data.err) reject(data);
        resolve(data.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
module.exports = ZingMp3;
