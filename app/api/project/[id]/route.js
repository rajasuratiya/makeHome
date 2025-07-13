import { prisma } from "@/lib/prisma";
import { uploadFileToGCS } from "@/lib/upload";

// GET: Fetch a single project by ID
export async function GET(req, { params }) {
  try {
    const { id } = params; // Extract id from params

    // Determine the where clause based on the presence of id
    const whereClause = isNaN(Number(id)) ? { slug: id } : { id: Number(id) };

    const project = await prisma.project.findUnique({
      where: whereClause,
      include: {
        gallery: true,
        images: true,
        video: true,
        floorPlans: {
          include: {
            media: true, // Include media inside floorPlans
          },
        },
        attachment: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!project) return Response.json({ error: "Project not found" }, { status: 404 });
    return Response.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// PUT: Update a project by ID, supporting file updates
export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      throw new Error("Invalid project ID. Must be an integer.");
    }

    const previousData = await prisma.project.findUnique({
      where: { id },
      include: {
        gallery: true,
        images: true,
        video: true,
        floorPlans: {
          include: {
            media: true, // Include media inside floorPlans
          },
        },
        attachment: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!previousData) throw new Error("A project with this ID is not found");

    const previousImages = previousData?.images || [];
    const previousGalleryImages = previousData?.gallery || [];
    const previousAttachments = previousData?.attachment || [];

    const formData = await req.formData();

    // Extract non-file fields
    const slug = formData.get("slug");
    const name = formData.get("name");
    const description = formData.get("description");
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
      if (file && file instanceof File) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        uploadedImages.push({ id: media.id });
      } else if (file && typeof file === "string") {
        const mediaFound = previousImages.find((e) => e.url === file);
        if (mediaFound && mediaFound?.id) {
          uploadedImages.push({ id: mediaFound.id });
        }
      }
    }
    console.log("1");
    // 2. Video (single)
    let uploadedVideo = null;
    const videoURL = formData.get("video");
    if (videoURL && typeof videoURL === "string" && videoURL.trim() !== "") {
      const media = await prisma.media.create({ data: { url: videoURL } });
      uploadedVideo = media;
    }

    console.log("2");

    // 3. Attachments (multiple)
    const attachmentFiles = formData.getAll("attachments") || [];
    const attachmentUrls = formData.getAll("existingAttachments") || [];
    let uploadedAttachments = [];
    for (const file of [...attachmentFiles, ...attachmentUrls]) {
      if (file && file instanceof File) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        uploadedAttachments.push({
          name: file.name,
          type: file.type,
          media: { connect: { id: media.id } },
        });
      } else if (file && typeof file === "string") {
        const attachmentFound = previousAttachments.find((e) => e.media.url === file);
        if (attachmentFound && attachmentFound?.id) {
          uploadedAttachments.push({
            name: attachmentFound.name,
            type: attachmentFound.type,
            media: { connect: { id: attachmentFound.media.id } },
          });
        }
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

    console.log("3");

    // 5. gallery (multiple)
    const galleryFiles = formData.getAll("galleryImages") || [];
    let uploadedGallery = [];
    for (const file of galleryFiles) {
      if (file && file instanceof File) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        uploadedGallery.push({ id: media.id });
      } else if (file && typeof file === "string") {
        const mediaFound = previousGalleryImages.find((e) => e.url === file);
        if (mediaFound && mediaFound?.id) {
          uploadedGallery.push({ id: mediaFound.id });
        }
      }
    }

    const floorPlanFiles = formData.getAll("floorPlanFiles") || [];
    let floorPlanUpdates = [];
    for (let i = 0; i < floorPlansData.length; i++) {
      const floorPlanMeta = floorPlansData[i];
      const file = floorPlanFiles[i];
      let mediaId = null;

      if (file && file instanceof File) {
        const url = await uploadFileToGCS(file);
        const media = await prisma.media.create({ data: { url } });
        mediaId = media.id;
      } else if (file && typeof file === "string") {
        const media = await prisma.media.create({ data: { url: file } });
        mediaId = media.id;
      }

      floorPlanUpdates.push({
        name: floorPlanMeta.name,
        details: floorPlanMeta.details || null,
        media: mediaId ? { connect: { id: mediaId } } : undefined,
      });
    }

    // First, disconnect all existing relationships
    await prisma.project.update({
      where: { id },
      data: {
        gallery: {
          disconnect: await prisma.project
            .findUnique({
              where: { id },
              select: { gallery: { select: { id: true } } },
            })
            .then((project) => project.gallery),
        },
        images: {
          disconnect: await prisma.project
            .findUnique({
              where: { id },
              select: { images: { select: { id: true } } },
            })
            .then((project) => project.images),
        },
        video: {
          disconnect: true,
        },
        attachment: {
          deleteMany: {},
        },
        floorPlans: {
          deleteMany: {},
        },
      },
    });

    // Then update with new data
    const updatedProject = await prisma.project.update({
      where: { id },
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
        gallery: uploadedGallery.length
          ? {
              set: [],
              connect: uploadedGallery,
            }
          : undefined,
        images: uploadedImages.length
          ? {
              set: [],
              connect: uploadedImages,
            }
          : undefined,
        video: uploadedVideo
          ? {
              connect: { id: uploadedVideo.id },
            }
          : undefined,
        attachment: uploadedAttachments.length
          ? {
              set: [],
              create: uploadedAttachments,
            }
          : undefined,
        floorPlans: floorPlanUpdates.length
          ? {
              create: floorPlanUpdates,
            }
          : undefined,
      },
    });

    return new Response(JSON.stringify(updatedProject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response(JSON.stringify({ error: "Failed to update project", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE: Delete a project and its associated media
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Delete related media first to avoid orphaned records
    await prisma.media.deleteMany({ where: { galleryImageId: Number(id) } });
    await prisma.media.deleteMany({ where: { projectImageId: Number(id) } });
    await prisma.media.deleteMany({ where: { projectVideoId: Number(id) } });

    await prisma.project.delete({ where: { id: Number(id) } });

    return Response.json({ message: "Project deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
