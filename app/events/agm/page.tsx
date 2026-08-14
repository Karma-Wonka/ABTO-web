import EventDetail from "@/components/site/event-detail";

export const metadata = { title: "Annual General Meeting" };

export default function AgmPage() {
  return (
    <EventDetail
      title="Annual General Meeting"
      kicker={<>ABTO&rsquo;s yearly act<br />of accountability</>}
      intro="The Annual General Meeting is ABTO's statutory governance event, the one meeting each year where the whole membership reviews the secretariat's work, approves the accounts and holds elected leadership to account."
      items={[
        { y: "Purpose", h: "Why the AGM exists", x: "A statutory requirement and the association's central act of governance: the forum where members, not just the Board, set direction and approve how the year was run." },
        { y: "Secretariat Updates", h: "What the year looked like", x: "The Executive Director reports on programmes delivered, membership growth, advocacy carried to government, and operational matters since the last AGM." },
        { y: "Financial Statements", h: "Accounts presented and approved", x: "Audited accounts for the year are presented to the membership for scrutiny and formal approval, the core financial accountability mechanism of the association." },
        { y: "Policy Discussions", h: "An open floor", x: "Members raise and debate matters affecting tour operations, from regulatory changes to sector-wide concerns, directly with the Board and secretariat present." },
        { y: "Every 3 Years", h: "Election of the Board", x: "Office bearers are elected by the membership for a three-year term. In non-election years, the AGM still convenes for accounts, policy and secretariat reporting." },
        { y: "Accountability", h: "Where it all comes together", x: "Member participation is what makes the AGM function: attendance, questions and votes are what hold the association's leadership accountable between meetings." }
      ]}
      side={
        <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.6rem,3vw,2.2rem)" }}>
          <div className="eyebrow on-dark">At a Glance</div>
          <dl style={{ display: "grid", gap: ".7rem", fontSize: ".85rem", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Frequency</dt><dd style={{ margin: 0 }}>Annual</dd></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Board elections</dt><dd style={{ margin: 0 }}>Every 3 years</dd></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Open to</dt><dd style={{ margin: 0 }}>Members in good standing</dd></div>
          </dl>
        </div>
      }
      cards={[
        { n: "Governance", h: "Member-led", x: "The AGM is the membership's own meeting, not a briefing delivered to it." },
        { n: "Financial Statements", h: "Audited and approved", x: "Accounts are reviewed and formally approved by the membership each year." },
        { n: "Participation", h: "Every member counts", x: "Attendance and votes are what give the Board its mandate between meetings." },
        { n: "Accountability", h: "The whole point", x: "Leadership answers to the membership once a year, in the room, on the record." }
      ]}
    />
  );
}
