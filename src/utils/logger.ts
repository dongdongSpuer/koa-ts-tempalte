import log4js from "log4js";
import getConfig from "../config/config.default";
const { logConfig } = getConfig;

log4js.configure(logConfig.logDeployment);

const logger = log4js.getLogger();

logger.level = logConfig.LOG_LEVEL;

export default logger;
