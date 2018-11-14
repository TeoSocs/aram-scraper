const rp = require("request-promise");
const $ = require("cheerio");

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(tierList));
  res.end();
}).listen(42690);

const BASE_URL = "https://www.metasrc.com";
const URL = BASE_URL + "/aram/tierlist";

let tierList = {}

function fetch() {
  rp(URL).then(function (html) {
    tierList = {}
    raw_champ = $('.champion-grid-item', html);
    for (let i = 0; i < raw_champ.length; i++) {
      let champ = {};

      champ.name = $('div > div', raw_champ[i].attribs["title"]).text();
      champ.link = BASE_URL + raw_champ[i].children[0].attribs["href"];
      champ.imgUrl = raw_champ[i].children[0].children[0].attribs["src"];
      champ.description = raw_champ[i].children[0].children[0].attribs["alt"];
      champ.tier = $('.tier', raw_champ[i].attribs["title"]).text();

      if (tierList[champ.tier] == null) {
        tierList[champ.tier] = [];
      }
      tierList[champ.tier].push(champ);
    }
    console.log(tierList);
  }).catch(function (err) {
    console.log(err)
  });
}

fetch()

setInterval(fetch, 30000)