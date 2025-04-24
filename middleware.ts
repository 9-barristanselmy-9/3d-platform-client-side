import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { privateRoutes } from "./routes";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;
  const url = req.nextUrl.origin;
  const isPrivateRoutes = privateRoutes.includes(nextUrl.pathname);

  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/`);
  }
  if (isAuthRoute && !isLoggedIn) {
    return;
  }

  if (!isLoggedIn && isPrivateRoutes)
    return Response.redirect(`${url}/auth/login`);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
