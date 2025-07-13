import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient();


export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // If user doesn't exist
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Return user data (excluding password)
    const userData = {
      id: user.id,
      email: user.email,
    }

    return NextResponse.json({
      message: "Login successful",
      user: userData
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// 🟡 PUT: Update a user (expects `id` in body)
// export async function PUT(req) {
//   try {
//     const { id, name, email, password, role } = await req.json();
//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: { name, email, password, role },
//     });
//     return Response.json(updatedUser);
//   } catch (error) {
//     return Response.json({ error: "Failed to update user" }, { status: 500 });
//   }
// }

// // 🔴 DELETE: Delete a user (expects `id` in query)
// export async function DELETE(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     if (!id) return Response.json({ error: "User ID is required" }, { status: 400 });

//     await prisma.user.delete({ where: { id } });
//     return Response.json({ message: "User deleted successfully" });
//   } catch (error) {
//     return Response.json({ error: "Failed to delete user" }, { status: 500 });
//   }
// }
