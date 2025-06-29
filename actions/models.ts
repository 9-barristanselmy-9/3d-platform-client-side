import { currentUser } from "@/lib/server";
import { prisma } from "@/prisma/prisma";

import { IModel } from "@/types/types";
export const createModel = async ({
  title,
  description,
  modelUrl,
  downloadUrl,
  publisherName,
  publisherAvatar,
}: IModel) => {
  const session = await currentUser();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const model = await prisma.model.create({
    data: {
      title,
      description,
      modelUrl,
      downloadUrl,
      publisherName,
      publisherAvatar,
      userId: session.user.id,
    },
  });

  return model;
};
