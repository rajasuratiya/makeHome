import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                blogs: {
                    include: {
                        // Blog: true, // Fetch related blogs
                    }
                }
            }
        });

        return Response.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name } = await req.json();

        if (!name) {
            return Response.json({ error: "Category name is required" }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: { name }
        });

        return Response.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return Response.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, name } = await req.json();

        if (!id || !name) {
            return Response.json({ error: "Category ID and name are required" }, { status: 400 });
        }

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name }
        });

        return Response.json(category);
    } catch (error) {
        console.error("Error updating category:", error);
        return Response.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return Response.json({ error: "Category ID is required" }, { status: 400 });
        }

        // First, delete references in BlogCategory to avoid FK constraints
        await prisma.blogCategory.deleteMany({
            where: { categoryId: parseInt(id) }
        });

        // Then, delete the category itself
        await prisma.category.delete({
            where: { id: parseInt(id) }
        });

        return Response.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return Response.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
