import winston from 'winston'

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`,),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/execution.log' }),
]

const Logger = winston.createLogger({
  level: 'info',
  format: format,
  transports: transports,
})

export default Logger