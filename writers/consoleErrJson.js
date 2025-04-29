/* 
destiné aux environnements non interactifs (non dev) où le but est de stocker les logs (et non de les consulter directement en temps réel) dans une stream json line delimited. C'est pourquoi on fait la sérialisation nous-même car sinon la console le fait parfois sur plusieurs lignes pour un log comme pour les erreurs
*/
const AbcStringify = require("abc-stringify");
const ss = new AbcStringify();

module.exports = ({ name, time, diff, level, data: logs }) => {
  let messages = [];
  let data;
  let error;
  logs.forEach((log) => {
    // concatène toutes les strings dans "message"
    if (typeof log === "string") return messages.push(log);
    // affecte la première erreur à error
    if (!error && log instanceof Error) error = log;
    // flatten tous les objets dans data (y compris les erreurs pour avoir les meta données)
    data = Object.assign(data || {}, log);
  });
  console.error(
    ss.stringify({ name, level, message: messages.join(" | "), error, data }) +
      "\n"
  );
};
