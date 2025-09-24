import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET() {
  try {
    const models = await prisma.model.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.error("Error fetching public models:", error);
    return NextResponse.json(
      { error: "Failed to fetch public models" },
      { status: 500 },
    );
  }
}
