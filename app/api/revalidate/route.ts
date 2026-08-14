import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function secretsMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;
  if (!secret || !expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ success: true, revalidated: true });
}
