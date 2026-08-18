import PageHead from "@/components/site/page-head";
import { getLiveData } from "@/lib/live-data";
import EventsList from "./events-list";

export const metadata = { title: "Events" };
export const revalidate = 60;

export default async function EventsPage() {
  const { events } = await getLiveData();

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Events"
        title={<>The association<br />calendar</>}
        intro="Members' forums, workshops, briefings and the Annual General Meeting. Registration is open to members in good standing."
      />
      <section className="pad-s">
        <EventsList events={events} />
      </section>
    </div>
  );
}
