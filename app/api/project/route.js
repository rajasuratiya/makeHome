import { prisma } from "@/lib/prisma";
import { uploadFileToGCS } from "@/lib/upload";

// GET: Fetch all projects with related media
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        gallery: true,
        images: true,
        video: true,
        floorPlans: {
          include: { media: true },
        },
        attachment: {
          include: { media: true },
        },
      },
    });
    return Response.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST: Create a new project with file uploads
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract non-file fields
    const name = formData.get("name");
    const description = formData.get("description");
    const slug = formData.get("slug");
    const overview = formData.get("overview") ? JSON.parse(formData.get("overview")) : null;
    const map = formData.get("map");
    const address = formData.get("address") || null;
    const mapDetails = formData.get("mapDetails") ? JSON.parse(formData.get("mapDetails")) : null;
    const whatsNearby = formData.get("whatsNearby") ? JSON.parse(formData.get("whatsNearby")) : null;
    const amenities = formData.getAll("amenities");
    const contactNumber = formData.get("contactNumber") || null;
    const contactEmail = formData.get("contactEmail") || null;

    // Process file uploads

    // 1. Images (multiple)
    const imageFiles = formData.getAll("images") || [];
    let uploadedImages = [];
    for (const file of imageFiles) {
      if (file && file.type && file.type.startsWith("image")) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        uploadedImages.push({ id: media.id });
      }
    }

    // 2. Video (single)
    let uploadedVideo = null;
    const videoURL = formData.get("video");
    if (videoURL && typeof videoURL === "string" && videoURL.trim() !== "") {
      // Create a media record directly using the provided URL
      const media = await prisma.media.create({ data: { url: videoURL } });
      uploadedVideo = media;
    }

    // 3. Attachments (multiple)
    const attachmentFiles = formData.getAll("attachments") || [];
    let uploadedAttachments = [];
    for (const file of attachmentFiles) {
      if (file) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        uploadedAttachments.push({
          name: file.name,
          type: file.type,
          media: { connect: { id: media.id } },
        });
      }
    }

    // 4. Floor Plans (metadata and files)
    let floorPlansData = [];
    const floorPlansMetaRaw = formData.get("floorPlans");
    if (floorPlansMetaRaw) {
      try {
        floorPlansData = JSON.parse(floorPlansMetaRaw);
        if (!Array.isArray(floorPlansData)) {
          throw new Error("floorPlans must be an array");
        }
      } catch (err) {
        throw new Error("Invalid floorPlans JSON: " + err.message);
      }
    }

    // 5. gallery  (multiple)
    const galleryFiles = formData.getAll("galleryImages") || [];
    let uploadedgallery = [];
    for (const file of galleryFiles) {
      if (file && file.type && file.type.startsWith("image")) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        uploadedgallery.push({ id: media.id });
      }
    }

    const floorPlanFiles = formData.getAll("floorPlanFiles") || [];
    let floorPlanCreates = [];
    if (floorPlansData.length > 0) {
      if (floorPlansData.length !== floorPlanFiles.length) {
        throw new Error("Number of floor plan metadata items does not match number of floor plan files");
      }
      for (let i = 0; i < floorPlansData.length; i++) {
        const floorPlanMeta = floorPlansData[i];
        const file = floorPlanFiles[i];
        if (file) {
          const url = await uploadFileToGCS(file);
          const media = await prisma.media.create({ data: { url } });
          floorPlanCreates.push({
            name: floorPlanMeta.name,
            details: floorPlanMeta.details || null,
            media: { connect: { id: media.id } },
          });
        }
      }
    }

    // Create the project with nested relations
    const project = await prisma.project.create({
      data: {
        description,
        slug,
        overview,
        name,
        map,
        address,
        mapDetails,
        whatsNearby,
        amenities,
        contactNumber,
        contactEmail,
        gallery: { connect: uploadedgallery },
        images: { connect: uploadedImages },
        video: uploadedVideo ? { connect: { id: uploadedVideo.id } } : undefined,
        attachment: { create: uploadedAttachments },
        floorPlans: { create: floorPlanCreates },
      },
    });

    return new Response(JSON.stringify(project), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create project",
        details: error?.message || error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
