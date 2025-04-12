import { S3Client } from "@aws-sdk/client-s3";

// Initialize S3 client for DigitalOcean Spaces
export const s3Client = new S3Client({
  region: "us-east-1", // DigitalOcean Spaces use this region identifier
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
});

export const spaceName = process.env.DO_SPACES_NAME || "";

export async function validateImageType(fileType: string): Promise<boolean> {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  return validTypes.includes(fileType);
}
