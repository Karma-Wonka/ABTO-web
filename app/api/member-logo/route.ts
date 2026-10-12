import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, R2_BUCKET } from "@/lib/r2";
import { getSession } from "@/lib/auth-session";
import { query } from "@/lib/postgres";

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
// No SVG: it can carry script and is served from our own signed-URL redirect.
const EXT: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };

// Signed-in members only; a member can only change the logo on the record
// matching their own session email.
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Please sign in." }, { status: 401 });
  }
  try {
    const file = (await request.formData().catch(() => null))?.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: "No file provided." }, { status: 400 });
    }
    const ext = EXT[file.type];
    if (!ext) {
      return NextResponse.json({ success: false, message: "Use a PNG, JPEG or WEBP image." }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ success: false, message: "Logo too large. Maximum size is 2MB." }, { status: 400 });
    }

    const key = `Logos/${Date.now()}-${randomUUID()}.${ext}`;
    await getR2Client().send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: new Uint8Array(await file.arrayBuffer()),
        ContentType: file.type
      })
    );

    const { rowCount } = await query(
      "UPDATE members SET logo_key = $1 WHERE lower(email) = lower($2)",
      [key, session.email]
    );
    if (!rowCount) {
      return NextResponse.json({ success: false, message: "No member record found for your account." }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Logo upload failed:", error);
    return NextResponse.json({ success: false, message: "Upload failed. Please try again." }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Please sign in." }, { status: 401 });
  }
  await query("UPDATE members SET logo_key = NULL WHERE lower(email) = lower($1)", [session.email]);
  return NextResponse.json({ success: true });
}
