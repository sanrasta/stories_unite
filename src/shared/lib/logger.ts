/**
 * Logger
 * 
 * Structured logging utility with log levels.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: unknown;
  timestamp: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let currentLogLevel: LogLevel = __DEV__ ? 'debug' : 'warn';

/**
 * Set the minimum log level
 */
export function setLogLevel(level: LogLevel): void {
  currentLogLevel = level;
}

/**
 * Check if a log level should be output
 */
function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLogLevel];
}

/**
 * Format and output a log entry
 */
function log(level: LogLevel, message: string, context?: string, data?: unknown): void {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    context,
    data,
    timestamp: new Date().toISOString(),
  };

  const prefix = context ? `[${context}]` : '';
  const formattedMessage = `${prefix} ${message}`;

  switch (level) {
    case 'debug':
      console.debug(formattedMessage, data ?? '');
      break;
    case 'info':
      console.info(formattedMessage, data ?? '');
      break;
    case 'warn':
      console.warn(formattedMessage, data ?? '');
      break;
    case 'error':
      console.error(formattedMessage, data ?? '');
      break;
  }
}

/**
 * Create a logger with a context prefix
 */
export function createLogger(context: string) {
  return {
    debug: (message: string, data?: unknown) => log('debug', message, context, data),
    info: (message: string, data?: unknown) => log('info', message, context, data),
    warn: (message: string, data?: unknown) => log('warn', message, context, data),
    error: (message: string, data?: unknown) => log('error', message, context, data),
  };
}

// Default logger
export const Logger = {
  debug: (message: string, data?: unknown) => log('debug', message, undefined, data),
  info: (message: string, data?: unknown) => log('info', message, undefined, data),
  warn: (message: string, data?: unknown) => log('warn', message, undefined, data),
  error: (message: string, data?: unknown) => log('error', message, undefined, data),
  createLogger,
  setLogLevel,
};

export default Logger;

