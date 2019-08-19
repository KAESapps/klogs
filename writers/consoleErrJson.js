/* 
destiné aux environnements non interactifs (non dev) où le but est de stocker les logs (et non de les consulter directement en temps réel) dans une stream json line delimited. C'est pourquoi on fait la sérialisation nous-même car sinon la console le fait parfois sur plusieurs lignes pour un log comme pour les erreurs
*/
const AbcStringify = require("abc-stringify");
const ss = new AbcStringify();

module.exports = ({ name, time, diff, level, data }) =>
  console.error(ss.stringify({ name, level, data }) + "\n");
