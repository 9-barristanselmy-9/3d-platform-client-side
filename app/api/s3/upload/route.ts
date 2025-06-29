"use server";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/server";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3Client";
import { prisma } from "@/prisma/prisma";
const uploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(request: Request) {
  const user = await currentUser();

  console.log(user);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = uploadRequestSchema.safeParse(body);
    console.log("content:", body);
    console.log("is valide:", validation.success);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { contentType, filename, size } = validation.data;

    const uniqueKey = `${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(s3, command, {
      expiresIn: 360, //6 min
    });

    console.log("presigneUrl", presignedUrl);
    await prisma.model.create({
      data: {
        userId: user.id,
        fileName: filename,
        key: uniqueKey,
        size,
        contentType,
        modelUrl: `https://t3.storage.dev/${process.env.S3_BUCKET_NAME}/${uniqueKey}`,
      },
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
