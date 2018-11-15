let tierList = require('../model/tierList')

const render = require('../helpers/render')

route = function(req, res) {
  // content = ""
  // for (tier in tierList.data) {
  //   content += `<h1>${tier} Tier</h1>`
  //   for (champ in tierList.data[tier]) {
  //     champData = tierList.data[tier][champ]
  //     content += `<p><img src='${champData.imgUrl}' /> <a href='${champData.link}'>${champData.name}</a>`
  //   }
  // }
  let values = {
    cssFile: "../public/stylesheets/style.css",
    body: ""
  }
  for (tier in tierList.data) {
    let champList = '';
    for (champ in tierList.data[tier]) {
      champList += render("champion.html", tierList.data[tier][champ])
    }
    values.body += render("tier.html", {tier: tier, champList: champList})
  }
  let content = render("index.html",values)
  res.send(content);
}

module.exports = route