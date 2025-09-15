// import winston from "winston";

// // Check if running in Edge Runtime
// const isEdgeRuntime =
//   typeof window !== "undefined" || process.env.NEXT_RUNTIME === "edge";

// const logger = isEdgeRuntime
//   ? {
//       info: (message, meta) => console.log(`INFO: ${message}`, meta),
//       warn: (message, meta) => console.warn(`WARN: ${message}`, meta),
//       error: (message, meta) => console.error(`ERROR: ${message}`, meta),
//     }
//   : winston.createLogger({
//       level: "info",
//       format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//       ),
//       transports: [
//         new winston.transports.File({
//           filename: "logs/error.log",
//           level: "error",
//         }),
//         new winston.transports.File({ filename: "logs/combined.log" }),
//         new winston.transports.Console({
//           format: winston.format.simple(),
//         }),
//       ],
//     });

// export { logger };
export const runtime = "nodejs";

import winston from "winston";

// Check if running in Edge Runtime
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
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

export { logger };
