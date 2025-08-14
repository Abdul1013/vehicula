// lib/utils.js

/**
 * Simple dump utility — logs object and returns a JSON response (for API routes).
 * In a server context you can call: res.json(dump(obj)) or console.log(dump(obj))
 */
export function dump(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return String(obj);
  }
}

/**
 * clearSessionCookie: returns a Set-Cookie header value that clears the cookie.
 * Use in Next.js API route:
 *
 *  res.setHeader('Set-Cookie', clearCookie(process.env.SESSION_COOKIE_NAME));
 */
export function clearCookie(name) {
  const cookie = `${name}=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  return cookie;
}

/**
 * Express-style redirect helper for API routes.
 * In Next.js API route: return redirectApi(res, '/dashboard')
 */
export function redirectApi(res, destination, status = 302) {
  res.statusCode = status;
  res.setHeader('Location', destination);
  res.end();
}
