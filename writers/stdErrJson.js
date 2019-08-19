const AbcStringify = require("abc-stringify");
const ss = new AbcStringify();
const stderr = process.stderr;

module.exports = ({ name, time, diff, level, data }) =>
  stderr.write(ss.stringify({ name, level, data }) + "\n");
