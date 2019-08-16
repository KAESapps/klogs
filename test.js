const otherLog = require(".")("other");
otherLog("should not be displayed");
otherLog.error("should be displayed");

const log = require(".")("apinfor").sub("server");
log.write = require("./writers/stdErrHuman");

log.info("Start");
log.debug("should not be displayed");

const params = {
  string: "string",
  number: 123,
  boolean: true
};

const doAction = () => {
  const sublog = log.sub("sync");
  sublog.debug("params", params);
  sublog("Start doing action with params", params);
  sublog.warn("Erreur à la création du fichier", new Error("FileNotFound"));
  sublog("Action done");
};

doAction();
log("done");
