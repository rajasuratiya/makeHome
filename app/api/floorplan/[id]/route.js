import { prisma } from "@/lib/prisma";

// GET: Fetch floor plan details by ID
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const floorPlan = await prisma.floorPlan.findUnique({
            where: { id: Number(id) },
            include: { media: true },
        });

        if (!floorPlan) return Response.json({ error: "Floor plan not found" }, { status: 404 });
        return Response.json(floorPlan);
    } catch (error) {
        return Response.json({ error: "Failed to fetch floor plan" }, { status: 500 });
    }
}
