import "server-only";
import { query } from "./postgres";

let ensured: Promise<unknown> | undefined;

// The members table is owned by the ABTO admin dashboard; this adds the one
// column the website needs for company logos. Idempotent and run once per
// server process, from write paths only (reads use SELECT * and tolerate it
// being absent).
export function ensureMemberLogoColumn() {
  ensured ??= query("ALTER TABLE members ADD COLUMN IF NOT EXISTS logo_key TEXT").catch((e) => {
    ensured = undefined;
    throw e;
  });
  return ensured;
}
