import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/postgres";
import { createSessionToken, SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/lib/session";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

type AuthUserRow = {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  role: string;
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Enter your email and password." },
      { status: 400 }
    );
  }

  const { rows } = await query<AuthUserRow>(
    "SELECT id, email, password_hash, name, role FROM auth_users WHERE lower(email) = $1",
    [email]
  );
  const user = rows[0];
  const valid = user ? await bcrypt.compare(password, user.password_hash) : false;

  if (!user || !valid) {
    return NextResponse.json(
      { success: false, message: "Incorrect email or password." },
      { status: 401 }
    );
  }

  const token = await createSessionToken({
    sub: String(user.id),
    email: user.email,
    name: user.name,
    role: user.role
  });

  const res = NextResponse.json({ success: true, name: user.name, email: user.email });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE
  });
  return res;
}
