import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

declare global {
  // eslint-disable-next-line no-var
  var __r2Client: S3Client | undefined;
}

/**
 * Cloudflare R2 client — R2 is S3-compatible, so the AWS SDK talks to it via
 * the account's R2 endpoint instead of an AWS region. Bucket stays private.
 * Uploads (membership application documents, under `Members/`) are
 * proxied through our own API route rather than a browser-facing presigned
 * URL, since those shouldn't be reachable by a guessable URL. Reads (the
 * signed Festival Calendar PDF under `Festival Calender/`, and Downloads/
 * Publications' files and cover images under `Publication and Downloads/`
 * and `documents/`, all uploaded from the admin dashboard) go out as
 * short-lived presigned GET URLs instead, generated per request in
 * app/api/festival-calendar, app/api/document-file/[id] and
 * app/api/document-image/[id].
 */
export function getR2Client() {
  if (!global.__r2Client) {
    global.__r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? ""
      }
    });
  }
  return global.__r2Client;
}

export const R2_BUCKET = process.env.R2_BUCKET_NAME ?? "";
