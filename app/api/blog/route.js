import { prisma } from "@/lib/prisma";
import { uploadFileToGCS } from "@/lib/upload";

// POST: Create a new blog-backup



export async function POST(req) {
    try {
        if (req.headers.get("content-type")?.includes("multipart/form-data")) {

            // Handle blog-backup creation with thumbnail

            const formData = await req.formData();

            const title = formData.get("title");
            const description = formData.get("description");
            const slug = formData.get("slug");
            const contentMarkdown = formData.get("contentMarkdown");
            const tags = formData.get("tags") ? JSON.parse(formData.get("tags")) : [];
            const metaJSON = formData.get("metaJSON") ? JSON.parse(formData.get("metaJSON")) : {};
            const categories = formData.get("categories") ? JSON.parse(formData.get("categories")) : [];
            const file = formData.get("thumbnail");

            if (!title || !description || !contentMarkdown) {
                return Response.json({
                    error: "Missing required fields: title, description, and contentMarkdown are required"
                }, { status: 400 });
            }

            let thumbnailUrl = null;
            if (file && file.size > 0) {
                thumbnailUrl = await uploadFileToGCS(file);
                if (!thumbnailUrl) {
                    return Response.json({ error: "Thumbnail upload failed" }, { status: 500 });
                }
            }

            const blog = await prisma.blog.create({
                data: {
                    title,
                    slug,
                    tags,
                    description,
                    metaJSON,
                    contentMarkdown,
                    thumbnail: thumbnailUrl ? { create: { url: thumbnailUrl } } : undefined
                },
                include: { categories: true },
            });

            if (categories.length > 0) {
                for (const categoryName of categories) {
                    const category = await prisma.category.upsert({
                        where: { name: categoryName },
                        update: {},
                        create: { name: categoryName }
                    });

                    await prisma.blogCategory.create({
                        data: { blogId: blog.id, categoryId: category.id }
                    });
                }
            }

            return Response.json(blog, { status: 201 });
        } else {
            return Response.json({ error: "Invalid content type" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error handling blog-backup request:", error);
        return Response.json({ error: `Request failed: ${error.message}` }, { status: 500 });
    }
}








export async function GET(req) {
    try {
        const blogs = await prisma.blog.findMany({
            include: {
                categories: true,
                thumbnail: true
            }
        });

        return Response.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return Response.json({
            error: `Failed to fetch blogs: ${error.message}`
        }, { status: 500 });
    }
 }




// Separate endpoint for thumbnail upload
export async function PUT(req, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return Response.json({ error: "Blog ID is required" }, { status: 400 });
        }

        if (req.headers.get("content-type")?.includes("multipart/form-data")) {
            // Handle blog-backup update with a new thumbnail
            const formData = await req.formData();
            const title = formData.get("title");
            const description = formData.get("description");
            const contentMarkdown = formData.get("contentMarkdown");
            const tags = formData.get("tags") ? JSON.parse(formData.get("tags")) : [];
            const metaJSON = formData.get("metaJSON") ? JSON.parse(formData.get("metaJSON")) : {};
            const categories = formData.get("categories") ? JSON.parse(formData.get("categories")) : [];
            const file = formData.get("thumbnail");

            if (!title || !description || !contentMarkdown) {
                return Response.json({
                    error: "Missing required fields: title, description, and contentMarkdown are required"
                }, { status: 400 });
            }

            let thumbnailUrl = null;
            if (file && file.size > 0) {
                thumbnailUrl = await uploadFileToGCS(file);
                if (!thumbnailUrl) {
                    return Response.json({ error: "Thumbnail upload failed" }, { status: 500 });
                }
            }

            const updatedBlog = await prisma.blog.update({
                where: { id },
                data: {
                    title,
                    description,
                    contentMarkdown,
                    tags,
                    metaJSON,
                    ...(thumbnailUrl ? { thumbnail: { create: { url: thumbnailUrl } } } : {})
                },
                include: { categories: true }
            });

            if (categories.length > 0) {
                await prisma.blogCategory.deleteMany({ where: { blogId: id } });

                for (const categoryName of categories) {
                    const category = await prisma.category.upsert({
                        where: { name: categoryName },
                        update: {},
                        create: { name: categoryName }
                    });

                    await prisma.blogCategory.create({
                        data: { blogId: id, categoryId: category.id }
                    });
                }
            }

            return Response.json(updatedBlog, { status: 200 });
        } else {
            return Response.json({ error: "Invalid content type" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating blog-backup:", error);
        return Response.json({ error: `Update failed: ${error.message}` }, { status: 500 });
    }
}

