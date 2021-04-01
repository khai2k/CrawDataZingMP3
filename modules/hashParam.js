const crypto = require("crypto");

const getHash256 = (a) => {
  return crypto.createHash("sha256").update(a).digest("hex");
};
const getHmac512 = (str, key) => {
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

let p = ["ctime", "id", "type", "page", "count", "version"];

//t: "/suggestKeyword/desktop"
//e: { num: 10,query: "a",ctime: 1617247569,version: "1.1.5",}

const hashParam = function (t, e) {
  var n = (function (t) {
      var e = g(t),
        n = [];
      for (var r in e)
        -1 !== p.indexOf(r) &&
          null !== t[r] &&
          void 0 !== t[r] &&
          "" !== t[r] &&
          (n[r] = e[r]);
      return v(n, "");
    })(e),
    r = getHash256(n);
  return getHmac512(t + r, "882QcNXV4tUZbvAsjmFOHqNC1LpcBRKW");
};
var g = function (t) {
  var e = {};
  return (
    Object.keys(t)
      .sort()
      .forEach(function (n) {
        e[n] = t[n];
      }),
    e
  );
};
var v = function (t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&",
    n = encodeURIComponent;
  return Object.keys(t)
    .map(function (e) {
      return n(t[e]).length > 5e3 ? "" : "".concat(n(e), "=").concat(n(t[e]));
    })
    .filter(function (t) {
      return "" !== t;
    })
    .join(e);
};

module.exports = hashParam;
