const fs = require("fs");

function mergeValues(values, content) {
  for (let key in values) {
    content = content.replace("{{" + key + "}}", values[key])
  }
  return content;
}

function render(templateName, values) {
  let fileContent = fs.readFileSync('./views/' + templateName, 'utf8');
  fileContent = mergeValues(values, fileContent);
  return fileContent;
}

module.exports = render;