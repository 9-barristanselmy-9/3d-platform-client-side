import { S3Client } from "@aws-sdk/client-s3";
export const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION,
  forcePathStyle: false,
});
