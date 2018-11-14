const rp = require("request-promise");
const $ = require("cheerio");

const BASE_URL = "https://www.metasrc.com/aram";
const URL = BASE_URL + "/tierlist";

let tierList = {}

class ChampionData {
  constructor(name, link, imgUrl, description) {
    this.name = name;
    this.link = link;
    this.imgUrl = imgUrl;
    this.description = description;
  }
}

rp(URL).then(function (html) {
  raw_champ = $('.champion-grid-item', html);
  console.log(raw_champ[0].children[0].children);
  for (let i = 0; i < raw_champ.length; i++) {
    let champ = new ChampionData();
    // champ.name = raw_champ[0].children;
    champ.link = raw_champ[i].children[0].attribs["href"];

    tier = $('.tier', raw_champ[i].attribs["title"]).text();
    if (tierList[tier] == null) {
      tierList[tier] = [];
    }
    tierList[tier].push(i);
  }
  console.log(tierList);
}).catch(function (err) {
  //handle error
});
