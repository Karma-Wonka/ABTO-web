import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/postgres";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

// Mirrors the auth_users table owned by the ABTO admin dashboard (../abtotest,
// src/lib/db.ts) so a membership application can also create the applicant's
// member-portal login. Safe to repeat — admin's own schema init already
// creates this table in the same shared Postgres database.
async function ensureAuthUsersTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS auth_users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'member',
      created_at TEXT NOT NULL
    )
  `);
}

// Mirrors the notifications table owned by the ABTO admin dashboard
// (../abtotest, src/lib/db.ts) so a new submission shows up in its
// notification bell without going through admin's own API.
async function ensureNotificationsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT,
      link TEXT,
      is_read BOOLEAN NOT NULL DEFAULT false,
      created_at TEXT NOT NULL
    )
  `);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload." }, { status: 400 });
    }

    const kind = body.kind === "membership" ? "membership" : "contact";
    const company = clean(body.company);
    const person = clean(body.name) || clean(body.person);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const message = clean(body.message);
    const password = typeof body.password === "string" ? body.password : "";

    if (!person || !email || (kind === "membership" && !company)) {
      return NextResponse.json(
        {
          success: false,
          message:
            kind === "membership"
              ? "Company, contact name and email are required."
              : "Name and email are required."
        },
        { status: 400 }
      );
    }

    const payloadIn = typeof body.payload === "object" && body.payload ? (body.payload as Record<string, unknown>) : {};
    const region = clean(payloadIn.region);
    const website = clean(payloadIn.website);
    const specialties = Array.isArray(payloadIn.specialties) ? payloadIn.specialties : [];
    const languages = Array.isArray(payloadIn.languages) ? payloadIn.languages : [];

    if (kind === "membership") {
      if (password.length < 8) {
        return NextResponse.json(
          { success: false, message: "Password must be at least 8 characters." },
          { status: 400 }
        );
      }
      if (!region || !phone) {
        return NextResponse.json(
          { success: false, message: "Base/dzongkhag and mobile number are required." },
          { status: 400 }
        );
      }

      await ensureAuthUsersTable();
      const { rows: existing } = await query(
        "SELECT id FROM auth_users WHERE lower(email) = lower($1)",
        [email]
      );
      if (existing.length > 0) {
        return NextResponse.json(
          { success: false, message: "An account with this email already exists." },
          { status: 409 }
        );
      }
    }

    const payload = {
      ...payloadIn,
      source: "web-membership-form",
      submittedAt: new Date().toISOString(),
    };

    if (kind === "membership") {
      const now = new Date().toISOString();
      const passwordHash = await bcrypt.hash(password, 10);
      await query(
        `
          INSERT INTO auth_users (email, password_hash, name, role, created_at)
          VALUES ($1, $2, $3, 'member', $4)
        `,
        [email.toLowerCase(), passwordHash, person, now]
      );

      // Applicant isn't a listed member yet — this row is 'pending' until
      // the secretariat verifies the licence/deposit slip in the
      // Submissions viewer and flips it to 'active' via the Members form.
      await query(
        `
          INSERT INTO members
            (name, region, phone, email, website, description, specialties, languages, member_since, status, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7::text, $8::text, $9, 'pending', $10, $10)
        `,
        [
          company,
          region,
          phone,
          email.toLowerCase(),
          website,
          message,
          JSON.stringify(specialties),
          JSON.stringify(languages),
          new Date().getFullYear(),
          now
        ]
      );
    }

    await query(
      `
        INSERT INTO submissions (kind, name, email, phone, company, message, payload, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, NOW())
      `,
      [kind, person, email, phone || null, company, message || null, JSON.stringify(payload)]
    );

    await ensureNotificationsTable();
    await query(
      `
        INSERT INTO notifications (type, title, body, link, created_at)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        "submission",
        kind === "membership"
          ? `New membership application: ${company || person}`
          : `New contact message from ${person}`,
        message || null,
        "/dashboard/submissions",
        new Date().toISOString()
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message:
          kind === "membership"
            ? "Membership application received."
            : "Message received."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Membership submission failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to submit the membership application right now." },
      { status: 500 }
    );
  }
}
