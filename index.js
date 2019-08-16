const identity = () => {};
const levels = ["debug", "info", "warn", "error"];

const NODE_ENV = process.env.NODE_ENV;
const isDev = !NODE_ENV || NODE_ENV === "dev" || NODE_ENV === "development";
const write = isDev
  ? require("./writers/console")
  : require("./writers/stdErrJson");

const isEnabledForLevel = require("./enabled");

const createLog = (name, parent) => {
  let lastTime = Date.now();
  let isEnabled;
  const log = (...arg) => log.info(...arg);
  levels.forEach(level => {
    if (!isEnabled) {
      isEnabled = isEnabledForLevel(name, level);
    }
    log[level] = isEnabled
      ? (...data) => {
          const time = Date.now();
          const diff = time - lastTime;
          lastTime = time;
          log.write({ name, time, diff, level, data });
        }
      : identity;
    log[level].enabled = isEnabled;
    if (!log.level && isEnabled) log.level = level;
  });
  log.sub = subName => createLog(name + ":" + subName, log);
  log.write = parent.write;
  return log;
};

module.exports = name => createLog(name, { write });
