import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, R2_BUCKET } from "@/lib/r2";
import { query } from "@/lib/postgres";

type Params = { params: Promise<{ id: string }> };

// Public on purpose — the member directory has no login gate. Redirects to a
// freshly signed URL because the R2 bucket stays private (see lib/r2.ts).
export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const { rows } = await query<{ logo_key: string | null }>(
    "SELECT logo_key FROM members WHERE id = $1 AND status = 'active'",
    [Number(id)]
  );
  const key = rows[0]?.logo_key;
  if (!key) {
    return NextResponse.json({ success: false, message: "No logo set." }, { status: 404 });
  }
  const url = await getSignedUrl(
    getR2Client(),
    new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }),
    { expiresIn: 3600 }
  );
  return NextResponse.redirect(url);
}
