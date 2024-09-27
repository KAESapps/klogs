const chalk = require("ansi-colors");
const colors = ["cyan", "magenta", "blue", "green", "yellow", "gray"];

exports.styledLevels = {
  debug: "DEBUG",
  info: chalk.green("INFO"),
  warn: chalk.bold.yellow("WARN"),
  error: chalk.bold.red("ERROR"),
};

const nameToColorMap = new Map();
let colorIndex = 0;
exports.nameToColor = (name) => {
  let color = nameToColorMap.get(name);
  if (color) return color;
  color = colors[colorIndex];
  colorIndex++;
  colorIndex = colorIndex % colors.length;
  nameToColorMap.set(name, color);
  return color;
};

exports.coloredByName = (name) => chalk[exports.nameToColor(name)];
