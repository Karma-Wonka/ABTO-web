import EventDetail from "@/components/site/event-detail";

export const metadata = { title: "Bhutan International Travel Mart" };

export default function BitmPage() {
  return (
    <EventDetail
      title="Bhutan International Travel Mart"
      kicker={<>Bhutan&rsquo;s tourism<br />trade platform</>}
      intro="The Bhutan International Travel Mart (BITM) is the national B2B platform connecting Bhutanese tour operators directly with international buyers, one shared stage instead of dozens of separate sales trips."
      items={[
        { y: "Overview", h: "One platform, the whole industry", x: "BITM brings tour operators, hoteliers and tourism boards together with international buyers and media under a single national trade event." },
        { y: "Purpose", h: "Market access at scale", x: "Individual operators, especially smaller ones, rarely have the budget for repeated international sales trips. BITM gives the whole membership shared access to the same buyers." },
        { y: "BITM 2026", h: "This edition", x: "BITM 2026 brings international buyers to Thimphu for structured meetings and a showcase of Bhutanese tourism products, with sustainability as a running theme across sessions." },
        { y: "B2B Meetings", h: "Structured buyer access", x: "Pre-scheduled one-to-one meetings connect Bhutanese operators directly with inbound tour operators, wholesalers and travel media from key source markets." },
        { y: "Tourism Products", h: "What members bring to the table", x: "Member operators showcase itineraries and experiences, from cultural circuits to trekking and the newer experience categories such as ecotourism and homestays." },
        { y: "Sustainability Focus", h: "Not a side session", x: "High-value, low-volume policy and the Sustainable Development Fee are woven through BITM's sessions rather than confined to a single sustainability track." },
        { y: "Future Editions", h: "BITM 2027 and beyond", x: "BITM is intended as a recurring fixture. Planning for BITM 2027 will build on buyer relationships and product development started at this edition." }
      ]}
      side={
        <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.6rem,3vw,2.2rem)" }}>
          <div className="eyebrow on-dark">BITM 2026</div>
          <dl style={{ display: "grid", gap: ".7rem", fontSize: ".85rem", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Format</dt><dd style={{ margin: 0 }}>B2B + showcase</dd></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Audience</dt><dd style={{ margin: 0 }}>International buyers</dd></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Next edition</dt><dd style={{ margin: 0 }}>BITM 2027</dd></div>
          </dl>
        </div>
      }
      cards={[
        { n: "Overview", h: "National trade platform", x: "One shared stage for the whole membership to meet international buyers." },
        { n: "B2B Meetings", h: "Structured, not casual", x: "Pre-scheduled meetings connect operators directly with inbound buyers." },
        { n: "Sustainability", h: "Woven throughout", x: "High-value, low-volume policy runs through sessions, not a side track." },
        { n: "Future Editions", h: "BITM 2027", x: "Planned as a recurring fixture, building on this edition's buyer relationships." }
      ]}
    />
  );
}
