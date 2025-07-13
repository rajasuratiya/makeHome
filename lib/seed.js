import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function seedAdminUser() {
  console.log("test");
  const hashedPassword = await bcrypt.hash(process.env.NEXT_PUBLIC_ADMIN_PASS, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "user",
    },
  });

  console.log("Admin user seeded:", adminUser);
}
