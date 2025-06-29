// /lib/validators/model-schema.ts
import { z } from "zod";

export const modelUploadSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().optional(), 
  modelUrl: z.string().url("Invalid model URL"),
  downloadUrl: z.string().url("Invalid download URL"),
});
