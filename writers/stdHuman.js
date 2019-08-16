const { styledLevels, coloredByName } = require("./utils");

const stderr = process.stderr;
const stdout = process.stdout;
module.exports = ({ name, diff, level, data }) => {
  const colored = coloredByName(name);
  const std = level === "error" || level === "warn" ? stderr : stdout;

  std.write(
    `${styledLevels[level]} ${colored("[" + name + "]")} ${data
      .map(JSON.stringify)
      .join(" ")} ${colored(`+${diff}ms`)}\n`
  );
};
