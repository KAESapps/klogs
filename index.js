const identity = () => {};
const levels = ["debug", "info", "warn", "error"];

const NODE_ENV = process.env.NODE_ENV;
const isDev = !NODE_ENV || NODE_ENV === "dev" || NODE_ENV === "development";
const write = isDev
  ? require("./writers/interactiveTerminal")
  : require("./writers/stdErrJson");

const isEnabledForLevel = (name, level) => {
  const config = process.env[level];
  if (!config) return false;
  if (config === "*") return true;
  if (name === config) return true;
  const nameSegments = name.split(":");
  return config.split(",").some(subConfig => {
    if (name === subConfig) return true;
    const configSegments = subConfig.split(":");
    for (var i = 0; i < configSegments.length; i++) {
      const configSegment = configSegments[i];
      if (configSegment === "*") return true;
      if (nameSegments[i] !== configSegment) break;
    }
  });
};

const createLog = name => {
  const start = Date.now();
  let isEnabled;
  const log = arg => log.info(arg);
  levels.forEach(level => {
    if (!isEnabled) {
      isEnabled = isEnabledForLevel(name, level);
    }
    log[level] = isEnabled
      ? (...data) => {
          const time = Date.now();
          const diff = time - start;
          createLog.write({ name, time, diff, level, data });
        }
      : identity;
  });
  log.sub = subName => createLog(name + ":" + subName);
  return log;
};
createLog.write = write;

module.exports = createLog;
