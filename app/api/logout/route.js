// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Clear the token cookie by deleting it
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.delete('token', { path: '/' });
  return response;
}
