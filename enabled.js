module.exports = (name, level) => {
  const configs = process.env[level.toUpperCase()];
  if (!configs) return false;
  if (configs === "*") return true;
  if (name === configs) return true;
  const nameSegments = name.split(":");
  return configs.split(",").some(subConfig => {
    if (name === subConfig) return true;
    const configSegments = subConfig.split(":");
    for (var i = 0; i < configSegments.length; i++) {
      const configSegment = configSegments[i];
      if (configSegment === "*") return true;
      if (nameSegments[i] !== configSegment) break;
    }
  });
};
