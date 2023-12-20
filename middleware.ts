import { NextRequest, NextResponse } from 'next/server';

interface RequestCookies {
  [key: string]: string;
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access-token');
  const path = request.nextUrl.pathname;

  // Array of all routes that are protected
  const protectedRoutes = [
    "/",
    "/recipes"
  ];

  // Array of all routes that are public
  const publicRoutes = ["/login", "/sign-up"];

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.nextUrl.pathname);

  if (path.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (
    !accessToken &&
    protectedRoutes.some((route) => path.startsWith(route)) &&
    !publicRoutes.some((route) => path.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
