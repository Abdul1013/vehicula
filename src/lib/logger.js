import winston from "winston";

const isEdgeRuntime =
  typeof window !== "undefined" || process.env.NEXT_RUNTIME === "edge";

const logger = isEdgeRuntime
  ? {
      info: (message, meta) => console.log(`INFO: ${message}`, meta),
      warn: (message, meta) => console.warn(`WARN: ${message}`, meta),
      error: (message, meta) => console.error(`ERROR: ${message}`, meta),
    }
  : winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        // Remove File transports for Vercel
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

export { logger };
