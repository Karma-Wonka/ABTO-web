import Link from "next/link";
import PageHead from "@/components/site/page-head";
import { getSession } from "@/lib/auth-session";
import { getLiveData } from "@/lib/live-data";
import FestivalsList from "./festivals-list";

export const metadata = { title: "Festival Calendar" };

export default async function FestivalsPage() {
  const [session, { festivals, festivalCalendarPdf }] = await Promise.all([
    getSession(),
    getLiveData()
  ]);

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Festival Calendar"
        title={<>Tshechu dates for<br />2025 and 2026</>}
        intro="Mask dance festivals across the dzongkhags. Dates are tentative until confirmed by the respective dzong. Always reconfirm with your operator before committing a group."
      />
      <section className="pad-s">
        {session ? (
          <FestivalsList festivals={festivals} pdfUrl={festivalCalendarPdf} />
        ) : (
          <div className="wrap">
            <div className="card" style={{ maxWidth: 560, textAlign: "center", padding: "clamp(2rem,4vw,3rem)" }}>
              <div className="eyebrow">Members Only</div>
              <h3 style={{ margin: ".6rem 0 1rem" }}>Sign in to view the Festival Calendar</h3>
              <p style={{ color: "#5A655E", marginBottom: "1.6rem" }}>
                The festival calendar is available to signed-in ABTO members. Sign in with your member
                account to see tshechu dates for 2025 and 2026.
              </p>
              <div style={{ display: "flex", gap: ".6rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/login?next=/festivals" className="btn"><span>Member Login</span></Link>
                <Link href="/membership#apply" className="btn btn-outline-dark"><span>Apply for Membership</span></Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
