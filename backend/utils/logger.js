/**
 * Logging Utility
 * Centralized logging for the Lynko backend
 */

const config = require('../config');

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const currentLevel = config.nodeEnv === 'production' ? logLevels.INFO : logLevels.DEBUG;

const log = (level, message, data = null) => {
  if (logLevels[level] <= currentLevel) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
    };

    if (level === 'ERROR') {
      console.error(JSON.stringify(logEntry, null, 2));
    } else {
      console.log(JSON.stringify(logEntry, null, 2));
    }
  }
};

const logger = {
  error: (message, data) => log('ERROR', message, data),
  warn: (message, data) => log('WARN', message, data),
  info: (message, data) => log('INFO', message, data),
  debug: (message, data) => log('DEBUG', message, data),
};

module.exports = logger;
