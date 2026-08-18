import PageHead from "@/components/site/page-head";
import { getLiveData } from "@/lib/live-data";
import EventsList from "./events-list";

export const metadata = { title: "Events" };
export const revalidate = 60;

export default async function EventsPage() {
  const { events, eventCalendar } = await getLiveData();

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Events"
        title={<>The association<br />calendar</>}
        intro="Members' forums, workshops, briefings and the Annual General Meeting. Registration is open to members in good standing."
      />
      <section className="pad-s">
        {eventCalendar && (
          <div className="wrap">
            <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.2rem", flexWrap: "wrap", background: "var(--forest)", color: "var(--ivory)", marginBottom: "clamp(2rem,4vw,3rem)" }}>
              <div>
                <span className="num" style={{ color: "var(--gold-pale)" }}>Official Record</span>
                <h3 style={{ marginBottom: ".3rem" }}>{eventCalendar.title}</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(246,242,233,.72)", margin: 0, maxWidth: "58ch" }}>
                  The full ABTO events calendar, uploaded by the secretariat.
                </p>
              </div>
              <a href={eventCalendar.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-gold" style={{ flex: "none" }}>
                <span>Download Event Calendar</span>
              </a>
            </div>
          </div>
        )}
        <EventsList events={events} />
      </section>
    </div>
  );
}
