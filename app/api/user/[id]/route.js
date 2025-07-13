import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🟢 GET user by ID
export async function GET(req, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });
    if (!user) return Response.json({ error: "User not found" }, { status: 404 });

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// 🟡 PUT: Update user by ID
export async function PUT(req, { params }) {
  try {
    const { name, email, password, role } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, password, role },
    });

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// 🔴 DELETE: Delete user by ID
export async function DELETE(req, { params }) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });
    return Response.json({ message: "User deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
