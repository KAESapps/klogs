const env = {
  ERROR: process.env.ERROR,
  WARN: process.env.WARN,
  INFO: process.env.INFO,
  DEBUG: process.env.DEBUG,
};

module.exports = (name, level) => {
  const configs =
    (globalThis.localStorage && globalThis.localStorage[level.toUpperCase()]) ||
    env[level.toUpperCase()];
  if (!configs) return false;
  if (configs === "*") return true;
  if (name === configs) return true;
  const nameSegments = name.split(":");
  return configs.split(",").some((subConfig) => {
    if (name === subConfig) return true;
    const configSegments = subConfig.split(":");
    for (var i = 0; i < configSegments.length; i++) {
      const configSegment = configSegments[i];
      if (configSegment === "*") return true;
      if (nameSegments[i] !== configSegment) break;
    }
  });
};
