// config/index.js

// Import constants & utilities
import constants from "./constants.js";
import * as functions from "./functions.js";
import * as commonScripts from "./commonscripts.js";

// Environment-based error logging
if (process.env.NODE_ENV === "development") {
  console.debug("Debug mode: verbose logging enabled");
} else {
  console.debug = () => {}; // disable debug logs in production
}

// Session / Auth setup placeholder
// In Next.js, you'd configure auth in `/pages/api/auth/[...nextauth].js`
// Or use cookies/JWT for persistence

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  constants,
  functions,
  commonScripts,
};
