import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, R2_BUCKET } from "@/lib/r2";
import { query } from "@/lib/postgres";

type Params = { params: Promise<{ id: string }> };

// Public on purpose — /downloads and /publications have no login gate.
// Redirects to a freshly signed R2 URL rather than storing a permanent
// public link, since the bucket stays private (see lib/r2.ts).
export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const { rows } = await query<{ file_key: string | null; title: string | null }>(
    "SELECT file_key, title FROM documents WHERE id = $1",
    [Number(id)]
  );
  const key = rows[0]?.file_key;
  if (!key) {
    return NextResponse.json({ success: false, message: "No file uploaded yet." }, { status: 404 });
  }

  const url = await getSignedUrl(
    getR2Client(),
    new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }),
    { expiresIn: 3600 }
  );
  return NextResponse.redirect(url);
}
