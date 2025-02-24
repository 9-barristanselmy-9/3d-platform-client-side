// middleware.ts
/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
