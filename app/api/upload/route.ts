import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, R2_BUCKET } from "@/lib/r2";

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

function sanitizeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
}

// Public and unauthenticated on purpose — applicants filling out the
// membership wizard aren't signed in. Objects go into a private R2 bucket
// under a random key; only the key is returned/stored, never a public URL.
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData().catch(() => null);
    const file = formData?.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: "No file provided." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Unsupported file type. Use PDF, JPEG, PNG or WEBP." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 8MB." },
        { status: 400 }
      );
    }

    const key = `membership/${Date.now()}-${randomUUID()}-${sanitizeName(file.name)}`;
    const body = new Uint8Array(await file.arrayBuffer());

    await getR2Client().send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: body,
        ContentType: file.type
      })
    );

    return NextResponse.json({ success: true, key, name: file.name, size: file.size }, { status: 201 });
  } catch (error) {
    console.error("R2 upload failed:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
