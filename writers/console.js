const { styledLevels, coloredByName } = require("./utils");

module.exports = ({ name, diff, level, data }) => {
  const colored = coloredByName(name);
  console[level](
    // new Date(time).toISOString(),
    styledLevels[level],
    colored(`[${name}]`),
    ...data,
    colored(`+${diff}ms`)
  );
};
