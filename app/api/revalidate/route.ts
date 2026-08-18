import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function secretsMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Every page that reads the corresponding table via lib/live-data.ts.
// Keep in sync with getLiveData()'s consumers.
const TAG_PATHS: Record<string, string[]> = {
  members: ["/members", "/membership"],
  events: ["/events"],
  news: ["/news"],
  documents: ["/downloads", "/publications"],
  festivals: ["/festivals"]
};

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;
  if (!secret || !expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tags: string[] = Array.isArray(body?.tags) ? body.tags : [];

  // Root layout carries getLiveData() to every page (header search index,
  // home page member count) — always bust it, plus the specific pages for
  // whichever tags were named.
  revalidatePath("/", "layout");
  for (const tag of tags) {
    for (const path of TAG_PATHS[tag] ?? []) {
      revalidatePath(path);
    }
  }

  return NextResponse.json({ success: true, revalidated: true, tags });
}
