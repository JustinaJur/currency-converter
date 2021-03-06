const http = require("http");
const parseString = require("xml2js").parseString;

const xmlToJson = (url, callback) => {
  const req = http.get(url, (res) => {
    let xml = "";

    res.on("data", (chunk) => {
      xml += chunk;
    });

    res.on("error", (e) => {
      callback(e, null);
    });

    res.on("timeout", (e) => {
      callback(e, null);
    });

    res.on("end", () => {
      parseString(xml, (err, result) => {
        callback(null, result);
      });
    });
  });
};

module.exports = xmlToJson;
