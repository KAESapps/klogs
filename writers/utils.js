const chalk = require("chalk");
var randomColor = require("randomcolor");

exports.styledLevels = {
  debug: "DEBUG",
  info: chalk.green("INFO"),
  warn: chalk.bold.yellow("WARN"),
  error: chalk.bold.red("ERROR")
};

const nameToColorMap = new Map();
exports.nameToColor = name => {
  let color = nameToColorMap.get(name);
  if (color) return color;
  color = randomColor();
  nameToColorMap.set(name, color);
  return color;
};

exports.coloredByName = name => chalk.hex(exports.nameToColor(name));
