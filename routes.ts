/**
 *
 *  @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentification
 * these routes will redirect logged in user to the Dashboard
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-verification",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for  API authentication purposes
 */
export const apiAuthPrifix = "/api/auth";

/**
 * the Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
