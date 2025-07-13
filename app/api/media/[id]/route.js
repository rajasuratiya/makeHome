import { prisma } from "@/lib/prisma";

// GET: Fetch media file by ID
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const media = await prisma.media.findUnique({
            where: { id: Number(id) },
        });

        if (!media) return Response.json({ error: "Media not found" }, { status: 404 });
        return Response.json(media);
    } catch (error) {
        return Response.json({ error: "Failed to fetch media" }, { status: 500 });
    }
}
