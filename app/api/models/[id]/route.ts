"use server";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/server";
import { prisma } from "@/prisma/prisma";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3Client";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // First, find the model to get the S3 key and verify ownership
    const model = await prisma.model.findUnique({
      where: { id },
    });

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    // Verify that the user owns this model
    if (model.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the file from S3
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: model.key,
    });

    await s3.send(deleteCommand);

    // Delete the model record from the database
    await prisma.model.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Model deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting model:", error);
    return NextResponse.json(
      { error: "Failed to delete model" },
      { status: 500 },
    );
  }
}
