import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSession } from "@/lib/auth-session";
import { getR2Client, R2_BUCKET } from "@/lib/r2";
import { query } from "@/lib/postgres";

// Members-only, matching /festivals itself — redirects to a freshly signed,
// short-lived R2 URL rather than storing a permanent public link, since the
// bucket stays private (see lib/r2.ts).
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const { rows } = await query<{ pdf_key: string | null }>(
    "SELECT pdf_key FROM festival_calendar WHERE id = 1"
  );
  const key = rows[0]?.pdf_key;
  if (!key) {
    return NextResponse.json(
      { success: false, message: "No festival calendar PDF has been uploaded yet." },
      { status: 404 }
    );
  }

  const url = await getSignedUrl(
    getR2Client(),
    new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }),
    { expiresIn: 300 }
  );
  return NextResponse.redirect(url);
}
