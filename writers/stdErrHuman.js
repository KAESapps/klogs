const { styledLevels, coloredByName } = require("./utils");

const stderr = process.stderr;
module.exports = ({ name, diff, level, data }) => {
  const colored = coloredByName(name);

  stderr.write(
    `${styledLevels[level]} ${colored("[" + name + "]")} ${data
      .map(JSON.stringify)
      .join(" ")} ${colored(`+${diff}ms`)}\n`
  );
};
