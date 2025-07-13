import { prisma } from "@/lib/prisma";
import { uploadFileToGCS } from "@/lib/upload";

// POST: Upload project attachments (PDFs, brochures)
export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const name = formData.get("name");
        const type = formData.get("type");
        const projectId = Number(formData.get("projectId"));

        if (!file || !projectId) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upload file to Google Cloud Storage
        const fileUrl = await uploadFileToGCS(file);
        if (!fileUrl) return Response.json({ error: "File upload failed" }, { status: 500 });

        // Store attachment reference in database
        const media = await prisma.media.create({ data: { url: fileUrl } });

        const attachment = await prisma.attachment.create({
            data: {
                name,
                type,
                mediaId: media.id,
                projectId,
            },
        });

        return Response.json(attachment, { status: 201 });
    } catch (error) {
        return Response.json({ error: "Failed to upload attachment" }, { status: 500 });
    }
}
