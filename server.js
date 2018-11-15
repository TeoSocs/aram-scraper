const express = require('express');
const aramTierList = require('./routes/aramTierListRoute')
const Scraper = require("./helpers/scraper");

const PORT = process.env.PORT || 8080

let app = express();
let scraper = new Scraper();

scraper.init();

app.use(express.static(__dirname + '/public'));

app.get('/', aramTierList);

app.listen(PORT, function () {
  console.log("Listening on Port " + PORT)
});