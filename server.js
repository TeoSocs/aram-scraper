let tierList = require('./model/tierList')
const PORT = process.env.PORT || 8080

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  content = ""
  for (tier in tierList.data) {
    content += `<h1>${tier} Tier</h1>`
    for (champ in tierList.data[tier]) {
      champData = tierList.data[tier][champ]
      content += `<p><img src='${champData.imgUrl}' /> <a href='${champData.link}'>${champData.name}</a>`
    }
  }
  res.write(content);
  res.end();
}).listen(PORT, "0.0.0.0", function () {
  console.log("Listening on Port " + PORT)
});

const Scraper = require("./controllers/scraper");

scraper = new Scraper();
scraper.init()