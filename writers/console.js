const { styledLevels, coloredByName } = require("./utils");

module.exports = ({ name, diff, level, data, time }) => {
  const colored = coloredByName(name);
  console[level](
    [
      styledLevels[level],
      colored(`[${name}] ${new Date(time).toISOString()} +${diff}ms`),
    ].join(" ")
    // ...data
  );
  // log des données sur une 2ème ligne car la console vscode n'arrive pas à gérer la couleur quand il y a des objets et c'est plus lisible
  console[level](...data);
};
