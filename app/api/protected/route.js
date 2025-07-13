// app/api/protected/route.js
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    return NextResponse.json({ message: 'Protected content', user: decoded });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
