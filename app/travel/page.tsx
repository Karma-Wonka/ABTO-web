import Link from "next/link";
import PageHead from "@/components/site/page-head";
import RidgeSvg from "@/components/site/ridge-svg";
import Accordion from "@/components/site/accordion";
import { DESTS, EXPERIENCES } from "@/data/site-data";
import { unsplashUrl } from "@/lib/unsplash";

export const metadata = { title: "Travel Information" };

const DEST_LOCAL: Record<string, string> = {
  Thimphu: "big-buddha",
  Punakha: "punakha-twilight-lit",
  Bumthang: "red-car-bumthang",
  "Haa Valley": "lhakhang-karpo"
};

const DEST_PHOTO: Record<string, string> = {
  "Paro Valley": "photo-1578556881786-851d4b79cb73",
  Trashigang: "photo-1598869012638-f5351b49498f"
};

function destPhoto(title: string) {
  if (DEST_LOCAL[title]) return <img src={`/img/${DEST_LOCAL[title]}.webp`} alt={`${title}, Bhutan`} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
  if (DEST_PHOTO[title]) return <img src={unsplashUrl(DEST_PHOTO[title])} alt={`${title}, Bhutan`} loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
  return null;
}

const VISITOR_FAQ: [string, string][] = [
  ["Do I need a visa?", "Yes, with the exception of nationals of India, Bangladesh and the Maldives, who require a permit rather than a visa. Your tour operator applies on your behalf once the trip is confirmed."],
  ["What is the Sustainable Development Fee?", "A per-night levy paid by most international visitors. It funds free healthcare, free education and conservation work. Your operator will confirm the current rate and any applicable concessions."],
  ["How fit do I need to be for trekking?", "It depends entirely on the route. Day walks around Paro and Thimphu suit most people. High routes such as the Snowman Trek cross passes above 5,000 m and demand serious preparation. Discuss honestly with your operator."],
  ["Can I travel independently?", "Independent travel is not permitted for most nationalities. You travel on a licensed operator's programme with a guide, though the itinerary itself can be built entirely around your interests."]
];

export default function TravelPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Travel Information"
        title={<>Getting to Bhutan,<br />and getting around it</>}
        intro="Paro International Airport is served by two carriers. Overland entry is possible at Phuentsholing, Gelephu and Samdrup Jongkhar. All visitors other than nationals of India, Bangladesh and the Maldives must book through a licensed operator."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="grid-2" style={{ marginBottom: "2.4rem" }}>
            <div className="card" id="drukair">
              <span style={{ color: "var(--kemar)" }}><svg width="30" height="30" aria-hidden="true"><use href="#i-plane" /></svg></span>
              <span className="num" style={{ marginTop: "1rem" }}>National Carrier</span>
              <h3>Druk Air, Royal Bhutan Airlines</h3>
              <p>Bhutan&rsquo;s flag carrier, operating from Paro to Delhi, Kathmandu, Bangkok, Singapore, Dhaka, Kolkata, Guwahati, Bagdogra and Gaya. Domestic services connect Paro with Bumthang, Gelephu and Yonphula.</p>
              <ul style={{ fontSize: ".87rem", color: "#57625B", lineHeight: 1.9, paddingLeft: "1.1rem", margin: ".8rem 0 0" }}>
                <li>Baggage and seating rules differ from most carriers, so brief your guests early</li>
                <li>Left-side seats give the best Himalayan views on the Kathmandu approach</li>
                <li>Weather delays are normal in monsoon; build a buffer day before international connections</li>
              </ul>
            </div>
            <div className="card" id="tashiair">
              <span style={{ color: "var(--kemar)" }}><svg width="30" height="30" aria-hidden="true"><use href="#i-plane" /></svg></span>
              <span className="num" style={{ marginTop: "1rem" }}>Private Carrier</span>
              <h3>Bhutan Airlines, Tashi Air</h3>
              <p>Bhutan&rsquo;s first private international airline, connecting Paro with Bangkok, Kathmandu, Delhi and Kolkata. Schedules are seasonal and change between the summer and winter timetables.</p>
              <ul style={{ fontSize: ".87rem", color: "#57625B", lineHeight: 1.9, paddingLeft: "1.1rem", margin: ".8rem 0 0" }}>
                <li>Confirm the operating timetable before quoting group itineraries</li>
                <li>Paro is a visual approach airport, so only certified crews may operate it</li>
                <li>Daylight-hours operation only; there are no night landings at Paro</li>
              </ul>
            </div>
          </div>

          <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.6rem,3.5vw,2.6rem)", marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            <div className="eyebrow on-dark">Paro International Airport (PBH)</div>
            <div className="grid-4" style={{ gap: "1.6rem" }}>
              <div><div style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", color: "var(--gold-pale)" }}>2,235 m</div><span style={{ fontFamily: "var(--f-util)", fontSize: ".6rem", letterSpacing: ".17em", textTransform: "uppercase", opacity: 0.6 }}>Elevation</span></div>
              <div><div style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", color: "var(--gold-pale)" }}>1 hr</div><span style={{ fontFamily: "var(--f-util)", fontSize: ".6rem", letterSpacing: ".17em", textTransform: "uppercase", opacity: 0.6 }}>Drive to Thimphu</span></div>
              <div><div style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", color: "var(--gold-pale)" }}>VFR</div><span style={{ fontFamily: "var(--f-util)", fontSize: ".6rem", letterSpacing: ".17em", textTransform: "uppercase", opacity: 0.6 }}>Daylight only</span></div>
              <div><div style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", color: "var(--gold-pale)" }}>2</div><span style={{ fontFamily: "var(--f-util)", fontSize: ".6rem", letterSpacing: ".17em", textTransform: "uppercase", opacity: 0.6 }}>Carriers serving</span></div>
            </div>
          </div>

          <div id="places" style={{ marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            <div className="eyebrow">Places of Interest</div>
            <h2 className="display-m" style={{ marginBottom: "1.8rem" }}>Where members take their guests</h2>
            <div className="grid-4">
              {DESTS.map((d, i) => (
                <article className="card" key={d.t} style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ height: 140, position: "relative" }}><RidgeSvg id={`pl${i}`} height={140} />{destPhoto(d.t)}</div>
                  <div style={{ padding: "1.3rem" }}>
                    <span className="tag t-green" style={{ marginBottom: ".6rem" }}>{d.tag}</span>
                    <h3 style={{ fontSize: "1.25rem", margin: ".55rem 0 .4rem" }}>{d.t}</h3><p style={{ fontSize: ".85rem" }}>{d.x}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="experiences" style={{ marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            <div className="eyebrow">Explore Bhutan</div>
            <h2 className="display-m" style={{ marginBottom: ".6rem" }}>Tourism experiences, not just itineraries</h2>
            <p className="lead" style={{ marginBottom: "1.8rem", maxWidth: "70ch" }}>Members build trips around what a guest actually wants to do. These are the experience categories most commonly requested.</p>
            <div className="grid-4">
              {EXPERIENCES.map((e) => (
                <article className="card divcard" key={e.t}>
                  <span className="dbadge" style={{ background: "var(--forest-mid)" }}><svg width="22" height="22" aria-hidden="true"><use href={`#${e.icon}`} /></svg></span>
                  <h4>{e.t}</h4>
                  <p style={{ fontSize: ".85rem", color: "#5A655E", margin: 0 }}>{e.x}</p>
                </article>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.8rem,3.5vw,2.6rem)", marginBottom: "clamp(2.6rem,5vw,4rem)", display: "flex", flexWrap: "wrap", gap: "1.6rem", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ maxWidth: "52ch" }}>
              <div className="eyebrow on-dark">Plan Sustainably</div>
              <h2 className="display-m" style={{ margin: ".4rem 0 .5rem" }}>How much will your trip cost the climate?</h2>
              <p style={{ color: "rgba(246,242,233,.75)", margin: 0 }}>Estimate your itinerary&rsquo;s carbon footprint in under a minute, and get Bhutan-specific ways to lower it — hydropower EVs, eco-lodges and more.</p>
            </div>
            <Link href="/carbon-calculator" className="btn btn-gold" style={{ flex: "none" }}><span>Calculate My Footprint</span></Link>
          </div>

          <div className="grid-2" style={{ marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            <div id="guides">
              <div className="eyebrow">Guides &amp; Support Services</div>
              <h2 className="display-m" style={{ marginBottom: "1.2rem" }}>Guides in Bhutan</h2>
              <p>Every visitor group travels with a licensed Bhutanese guide. Guides are certified by category: cultural, trekking and specialist endorsements such as birding, and must hold current certification to work.</p>
              <p>For treks, horse contractors provide pack animals and handlers. ABTO maintains the horse contractor list used by members when planning multi-day routes, alongside the campsite allocation rules set out in the trekking regulations.</p>
              <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.2rem" }}>
                <Link href="/horses" className="btn btn-sm"><span>Horse Contractor List</span></Link>
              </div>
            </div>
            <div>
              <div className="eyebrow">Why Use a Tour Operator?</div>
              <h2 className="display-m" style={{ marginBottom: "1.2rem" }}>It is not only a requirement</h2>
              <p>Booking through a licensed operator is required for most nationalities, but it is also the practical route. Your operator handles visa processing, route permits for restricted areas, transport, licensed guiding, accommodation and the Sustainable Development Fee.</p>
              <p>They also carry local knowledge that changes an itinerary from adequate to memorable: which valley is at its best this week, which festival dance is worth waiting for, and which trail is passable after rain.</p>
              <Link href="/members" className="btn btn-sm" style={{ marginTop: ".6rem" }}><span>Find a Member Operator</span></Link>
            </div>
          </div>

          <div id="best-time" style={{ marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            <div className="eyebrow">Best Time to Visit</div>
            <h2 className="display-m" style={{ marginBottom: ".6rem" }}>Four seasons, four different Bhutans</h2>
            <p className="lead" style={{ marginBottom: "1.8rem", maxWidth: "70ch" }}>There is no single best month, only a best season for what you want to see. Your operator will match the trip to the season, not the other way around.</p>
            <div className="grid-4" style={{ marginBottom: "1.8rem" }}>
              <article className="card"><span className="num">Mar – May</span><h3>Spring</h3><p style={{ fontSize: ".87rem" }}>Rhododendrons and magnolia bloom across the mid-hills, skies clear after winter, and the first major tshechus of the year draw crowds to Paro and Punakha. Comfortable trekking at low and mid elevation.</p></article>
              <article className="card"><span className="num">Jun – Aug</span><h3>Summer</h3><p style={{ fontSize: ".87rem" }}>The monsoon fills the valleys with rice-planting green and fewer visitors. Higher passes turn muddy or close, but this is the season for lowland culture, waterfalls and quieter dzongs.</p></article>
              <article className="card"><span className="num">Sep – Nov</span><h3>Autumn</h3><p style={{ fontSize: ".87rem" }}>Bhutan&rsquo;s peak season: the clearest mountain views of the year and the largest tshechus, including the Thimphu Tshechu. The reliable window for high-altitude treks such as the Snowman.</p></article>
              <article className="card"><span className="num">Dec – Feb</span><h3>Winter</h3><p style={{ fontSize: ".87rem" }}>Cold, dry and quiet, with crisp light over the dzongs and the black-necked cranes wintering in Phobjikha. Lower valleys such as Punakha stay mild even as high passes close.</p></article>
            </div>
            <p style={{ maxWidth: "70ch", color: "#4A554E" }}>Bhutan rewards a visit in any month: festivals, trekking windows, wildlife and crowd levels each peak at a different time of year, so the right season depends on what you want from the trip, not a single calendar window. Bhutan is a year-round destination.</p>
          </div>

          <div>
            <div className="eyebrow">Visitor FAQ</div>
            <h2 className="display-m" style={{ marginBottom: "1.6rem" }}>Before you travel</h2>
            <div style={{ maxWidth: 900 }}><Accordion items={VISITOR_FAQ} /></div>
          </div>
        </div>
      </section>
    </div>
  );
}
