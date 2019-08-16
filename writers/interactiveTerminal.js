const chalk = require("chalk");
var randomColor = require("randomcolor");

const styledLevels = {
  debug: "DEBUG",
  info: chalk.green("INFO"),
  warn: chalk.bold.yellow("WARN"),
  error: chalk.bold.red("ERROR")
};
const nameToColor = new Map();
const coloredName = name => {
  let color = nameToColor.get(name);
  if (color) return color;
  color = randomColor();
  nameToColor.set(name, color);
  return color;
};

module.exports = ({ name, time, diff, level, data }) => {
  const colored = chalk.hex(coloredName(name));
  console.error(
    // new Date(time).toISOString(),
    styledLevels[level],
    colored(`[${name}]`),
    ...data,
    colored(`+${diff}ms`)
  );
};
