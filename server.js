const rp = require("request-promise");
const $ = require("cheerio");
const PORT = process.env.PORT || 8080

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  content = ""
  for (tier in tierList) {
    content += `<h1>${tier} Tier</h1>`
    for (champ in tierList[tier]) {
      champData = tierList[tier][champ]
      content += `<p><img src='${champData.imgUrl}' /> <a href='${champData.link}'>${champData.name}</a>`
    }
  }
  res.write(content);
  res.end();
}).listen(PORT, "0.0.0.0", function() {
  console.log("Listening on Port" + PORT)
});

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

setInterval(fetch, 36000000)
