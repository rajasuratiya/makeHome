import { prisma } from "@/lib/prisma";

export async function GET(req) {
    try {
        const blogCategories = await prisma.blogCategory.findMany({
            include: { Blog: true, Category: true },
        });
        return Response.json(blogCategories);
    } catch (error) {
        return Response.json({ error: "Failed to fetch blog-backup categories" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { blogId, categoryId } = await req.json();
        const blogCategory = await prisma.blogCategory.create({
            data: { blogId, categoryId },
        });
        return Response.json(blogCategory, { status: 201 });
    } catch (error) {
        return Response.json({ error: "Failed to create blog-backup category" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, blogId, categoryId } = await req.json();
        const blogCategory = await prisma.blogCategory.update({
            where: { id },
            data: { blogId, categoryId },
        });
        return Response.json(blogCategory);
    } catch (error) {
        return Response.json({ error: "Failed to update blog-backup category" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await prisma.blogCategory.delete({ where: { id } });
        return Response.json({ message: "Blog category deleted successfully" });
    } catch (error) {
        return Response.json({ error: "Failed to delete blog-backup category" }, { status: 500 });
    }
}
