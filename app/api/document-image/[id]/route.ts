import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, R2_BUCKET } from "@/lib/r2";
import { query } from "@/lib/postgres";

type Params = { params: Promise<{ id: string }> };

// Public on purpose — /publications itself has no login gate. Redirects to
// a freshly signed R2 URL rather than storing a permanent public link,
// since the bucket stays private (see lib/r2.ts); a longer expiry than the
// members-only Festival Calendar link since this backs a plain <img> tag
// on a public page.
export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const { rows } = await query<{ image_key: string | null }>(
    "SELECT image_key FROM documents WHERE id = $1",
    [Number(id)]
  );
  const key = rows[0]?.image_key;
  if (!key) {
    return NextResponse.json({ success: false, message: "No image set." }, { status: 404 });
  }

  const url = await getSignedUrl(
    getR2Client(),
    new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }),
    { expiresIn: 3600 }
  );
  return NextResponse.redirect(url);
}
