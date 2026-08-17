import { redirect } from "next/navigation";
import PageHead from "@/components/site/page-head";
import { getSession } from "@/lib/auth-session";
import { query } from "@/lib/postgres";
import SignOutButton from "./sign-out-button";

export const metadata = { title: "My Account" };

type MemberRow = {
  name: string;
  region: string;
  phone: string;
  email: string;
  member_since: number;
  status: string;
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/profile");

  const { rows } = await query<MemberRow>(
    "SELECT name, region, phone, email, member_since, status FROM members WHERE lower(email) = lower($1)",
    [session.email]
  );
  const member = rows[0];
  const active = member?.status === "active";

  return (
    <div className="page on page-in">
      <PageHead
        crumb="My Account"
        title={<>Welcome back{member ? <>,<br />{member.name}</> : null}</>}
      />
      <section className="pad-s">
        <div className="wrap" style={{ maxWidth: 640 }}>
          {!member ? (
            <div className="card" style={{ padding: "clamp(1.6rem,3vw,2.2rem)" }}>
              <p style={{ color: "#5A655E" }}>
                We couldn&rsquo;t find a member record linked to {session.email}. Contact the secretariat at{" "}
                <strong>info@abto.org.bt</strong> if you believe this is a mistake.
              </p>
              <div style={{ marginTop: "1.4rem" }}><SignOutButton /></div>
            </div>
          ) : (
            <>
              <div className="card" style={{ padding: "clamp(1.6rem,3vw,2.2rem)", marginBottom: "1.4rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div>
                    <div className="eyebrow">Membership Status</div>
                    <span
                      style={{
                        display: "inline-block", marginTop: ".5rem", padding: ".3rem .8rem", borderRadius: 999,
                        fontFamily: "var(--f-util)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase",
                        background: active ? "#E8F0EA" : "#FDF4E6",
                        color: active ? "var(--forest)" : "var(--gold)"
                      }}
                    >
                      {active ? "Active" : "Pending Verification"}
                    </span>
                  </div>
                  <SignOutButton />
                </div>
                <dl style={{ display: "grid", gap: ".7rem", fontSize: ".92rem", borderTop: "1px solid rgba(20,28,24,.1)", marginTop: "1.4rem", paddingTop: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ color: "#5A655E" }}>Company</dt><dd style={{ margin: 0, fontWeight: 500 }}>{member.name}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ color: "#5A655E" }}>Base</dt><dd style={{ margin: 0 }}>{member.region}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ color: "#5A655E" }}>Email</dt><dd style={{ margin: 0 }}>{member.email}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ color: "#5A655E" }}>Phone</dt><dd style={{ margin: 0 }}>{member.phone}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ color: "#5A655E" }}>Member since</dt><dd style={{ margin: 0 }}>{member.member_since}</dd></div>
                </dl>
              </div>

              <div className="card" style={{ padding: "clamp(1.6rem,3vw,2.2rem)" }}>
                <div className="eyebrow">Membership Certificate</div>
                <h3 style={{ margin: ".5rem 0 1rem" }}>Digital Membership Certificate</h3>
                {active ? (
                  <>
                    <p style={{ color: "#5A655E", marginBottom: "1.4rem" }}>
                      Your {new Date().getFullYear()} certificate is ready. It confirms {member.name} as a
                      registered ABTO member in good standing.
                    </p>
                    <a href="/api/certificate" download className="btn">
                      <span>Download Certificate</span>
                      <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
                    </a>
                  </>
                ) : (
                  <p style={{ color: "#5A655E" }}>
                    Your certificate will be available once the secretariat verifies your licence and deposit
                    slip and activates your membership.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
