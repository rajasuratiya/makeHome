// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // If no token is found, redirect to the login page
  if (!token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure the middleware to run on the desired routes:
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/add-property/:path*',
    '/add-blog-backup/:path*',
    '/my-blogs/:path*'
  ],
};
