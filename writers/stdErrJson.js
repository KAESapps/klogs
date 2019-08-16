const toJson = require("json-log").toJson;
const stderr = process.stderr;

module.exports = ({ name, time, diff, level, data }) =>
  stderr.write(toJson({ name, level, data }) + "\n");
