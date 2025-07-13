import { prisma } from "@/lib/prisma";
import { uploadFileToGCS } from "@/lib/upload";
export async function PUT(req, { params }) {
    try {
        const { id } = params;

        if (req.headers.get("content-type")?.includes("multipart/form-data")) {
            const formData = await req.formData();
            const slug = formData.get("slug");
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

            // Check if blog-backup exists
            const existingBlog = await prisma.blog.findUnique({
                where: { id: parseInt(id) },
                include: {
                    thumbnail: true,
                    categories: {
                        include: {
                            Category: true
                        }
                    }
                }
            });

            if (!existingBlog) {
                return Response.json({ error: "Blog not found" }, { status: 404 });
            }

            let thumbnailData = undefined;
            if (file && file.size > 0) {
                const thumbnailUrl = await uploadFileToGCS(file);
                if (!thumbnailUrl) {
                    return Response.json({ error: "Thumbnail upload failed" }, { status: 500 });
                }

                // If there's an existing thumbnail, update it; otherwise, create a new one
                thumbnailData = {
                    thumbnail: {
                        upsert: {
                            create: { url: thumbnailUrl },
                            update: { url: thumbnailUrl }
                        }
                    }
                };
            }

            // Update the blog-backup
            const updatedBlog = await prisma.$transaction(async (prisma) => {
                // Delete existing category relationships
                await prisma.blogCategory.deleteMany({
                    where: { blogId: parseInt(id) }
                });

                // Create category relationships
                for (const categoryName of categories) {
                    const category = await prisma.category.upsert({
                        where: { name: categoryName },
                        update: {},
                        create: { name: categoryName }
                    });

                    await prisma.blogCategory.create({
                        data: {
                            blogId: parseInt(id),
                            categoryId: category.id
                        }
                    });
                }

                // Update blog-backup
                return prisma.blog.update({
                    where: { id: parseInt(id) },
                    data: {
                        slug,
                        title,
                        description,
                        contentMarkdown,
                        tags,
                        metaJSON,
                        ...thumbnailData
                    },
                    include: {
                        categories: {
                            include: {
                                Category: true
                            }
                        },
                        thumbnail: true
                    }
                });
            });

            return Response.json(updatedBlog, { status: 200 });
        } else {
            return Response.json({ error: "Invalid content type" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating blog-backup:", error);
        return Response.json({ error: `Update failed: ${error.message}` }, { status: 500 });
    }
}



export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        if (!id) {
            return Response.json({ error: "Blog ID is required" }, { status: 400 });
        }

        // First, remove relations in BlogCategory (if necessary)
        await prisma.blogCategory.deleteMany({
            where: { blogId: parseInt(id) }
        });

        // Now, delete the blog-backup
        const deletedBlog = await prisma.blog.delete({
            where: { id: parseInt(id) }
        });

        return Response.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog-backup:", error);
        return Response.json({
            error: `Failed to delete blog: ${error.message}`
        }, { status: 500 });
    }
}


export async function GET(req, { params }) {
    try {
        const { id } = params;


        const whereClause = isNaN(Number(id)) ? { slug: id } : { id: Number(id) };

        const blog = await prisma.blog.findUnique({
            where: whereClause,
            include: {
                categories: true,
                thumbnail: true
            },
        });

        if (!blog) {
            return Response.json({ error: "Blog not found" }, { status: 404 });
        }

        return Response.json(blog);
    } catch (error) {
        console.error("Error fetching blog-backup:", error);
        return Response.json({
            error: `Failed to fetch blog: ${error.message}`
        }, { status: 500 });
    }
}
