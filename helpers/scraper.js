const rp = require("request-promise");
const $ = require("cheerio");

const ChampionData = require('../model/championData');

let tierList = require('../model/tierList')

class Scraper {
  constructor() {
    this.BASE_URL = "https://www.metasrc.com";
    this.URL = this.BASE_URL + "/aram/tierlist";
  }
  fetch() {
    rp(this.URL).then(function (html) {
      tierList.erase();

      let raw_champ = $('.champion-grid-item', html);
      for (let i = 0; i < raw_champ.length; i++) {
        let champ = new ChampionData();

        champ.name = $('div > div', raw_champ[i].attribs["title"]).text();
        
        champ.link = this.BASE_URL + raw_champ[i].children[0].attribs["href"];
        champ.imgUrl = raw_champ[i].children[0].children[0].attribs["src"];
        champ.description = raw_champ[i].children[0].children[0].attribs["alt"];
        champ.tier = $('.tier', raw_champ[i].attribs["title"]).text();

        tierList.add(champ)
      }
      console.log(tierList.data);
    }.bind(this)).catch(function (err) {
      console.log(err)
    });
  }

  init() {
    this.fetch()
    setInterval(this.fetch.bind(this), 5000000)
  }

}

module.exports = Scraper




