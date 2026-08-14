import EventDetail from "@/components/site/event-detail";

export const metadata = { title: "Regenerative Bhutan Forum" };

export default function RbfPage() {
  return (
    <EventDetail
      title="Regenerative Bhutan Forum"
      kicker={<>Beyond sustainability,<br />toward regeneration</>}
      intro="The Regenerative Bhutan Forum (RBF) is ABTO's platform for moving Bhutan's tourism conversation from sustaining what exists to actively regenerating it, environmentally, culturally and economically."
      items={[
        { y: "History & Objectives", h: "Why a regenerative forum", x: "Bhutan's high-value, low-volume policy already limits harm. The RBF asks a further question: how can tourism actively leave places, communities and culture better than it found them?" },
        { y: "18–20 Aug 2025", h: "The inaugural forum, Dungkar Dzong", x: "ABTO convened the first Regenerative Bhutan Forum at Dungkar Dzong, bringing together government, operators and international voices for three days of sessions and dialogue." },
        { y: "Keynote", h: "Anna Pollock on regenerative tourism", x: "A keynote address and main panel, Global and National Perspectives on Regenerative Tourism, framed the shift from sustainability to regeneration for a Bhutanese audience." },
        { y: "Community-Led Tourism", h: "Ownership at the local level", x: "Sessions examined models where communities, not just operators, hold a direct stake in tourism's benefits and decisions, extending Bhutan's homestay and village-based experiences." },
        { y: "Green Standards", h: "The Bhutan Green Hotel Standard", x: "The forum introduced the Bhutan Green Hotel Standard, a framework for accommodation providers to measure and improve environmental performance." },
        { y: "Capacity Building & Policy Dialogue", h: "Turning ideas into practice", x: "Working sessions paired capacity-building for operators with direct policy dialogue alongside government counterparts, so commitments made in the room had somewhere to go." },
        { y: "Looking Ahead", h: "A vision for future forums", x: "The inaugural RBF was framed as the first of a recurring platform, with future forums intended to track progress on the Bhutan Green Hotel Standard and deepen community-led tourism work." }
      ]}
      photo={
        <img
          src="/img/rbf-panel-lg.webp"
          alt="Main panel at the Regenerative Bhutan Forum, Dungkar Dzong"
          loading="eager"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      }
      caption="Global and National Perspectives on Regenerative Tourism, the RBF 2025 main panel at Dungkar Dzong"
      side={
        <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.6rem,3vw,2.2rem)" }}>
          <div className="eyebrow on-dark">RBF 2025</div>
          <dl style={{ display: "grid", gap: ".7rem", fontSize: ".85rem", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Dates</dt><dd style={{ margin: 0 }}>18–20 Aug 2025</dd></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Venue</dt><dd style={{ margin: 0 }}>Dungkar Dzong</dd></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Keynote</dt><dd style={{ margin: 0 }}>Anna Pollock</dd></div>
          </dl>
        </div>
      }
      cards={[
        { n: "Objective", h: "Regeneration, not just limits", x: "Move past harm-reduction toward tourism that actively improves what it touches." },
        { n: "Green Standards", h: "Bhutan Green Hotel Standard", x: "A measurable framework introduced at RBF 2025 for accommodation providers." },
        { n: "Community", h: "Local ownership", x: "Community-led models that extend Bhutan's homestay and village tourism." },
        { n: "Vision", h: "A recurring platform", x: "RBF 2025 was framed as the first of future forums, not a one-off event." }
      ]}
    />
  );
}
