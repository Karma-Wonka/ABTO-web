import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getSession } from "@/lib/auth-session";
import { query } from "@/lib/postgres";

type MemberRow = {
  name: string;
  region: string;
  member_since: number;
  status: string;
};

const FOREST = rgb(0x1e / 255, 0x3a / 255, 0x2f / 255);
const KEMAR = rgb(0x8c / 255, 0x2b / 255, 0x23 / 255);
const GOLD = rgb(0x8d / 255, 0x66 / 255, 0x2e / 255);
const IVORY = rgb(0xf6 / 255, 0xf2 / 255, 0xe9 / 255);

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const { rows } = await query<MemberRow>(
    "SELECT name, region, member_since, status FROM members WHERE lower(email) = lower($1)",
    [session.email]
  );
  const member = rows[0];
  if (!member) {
    return NextResponse.json(
      { success: false, message: "No member record found for this account." },
      { status: 404 }
    );
  }
  if (member.status !== "active") {
    return NextResponse.json(
      { success: false, message: "Your membership is still pending verification." },
      { status: 403 }
    );
  }

  const year = new Date().getFullYear();
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([842, 595]); // A4 landscape
  const { width, height } = page.getSize();
  const serif = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const serifItalic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({ x: 0, y: 0, width, height, color: IVORY });
  page.drawRectangle({ x: 24, y: 24, width: width - 48, height: height - 48, borderColor: GOLD, borderWidth: 2 });
  page.drawRectangle({ x: 34, y: 34, width: width - 68, height: height - 68, borderColor: FOREST, borderWidth: 1 });

  const centerText = (text: string, y: number, font = serif, size = 20, color = FOREST) => {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font, color });
  };

  centerText("ASSOCIATION OF BHUTANESE TOUR OPERATORS", height - 90, sansBold, 13, KEMAR);
  centerText("Certificate of Membership", height - 150, serif, 30, FOREST);
  centerText("This certifies that", height - 210, sans, 13, rgb(0.35, 0.38, 0.36));
  centerText(member.name, height - 255, serif, 26, KEMAR);
  centerText(`based in ${member.region}, Bhutan,`, height - 290, sans, 13, rgb(0.35, 0.38, 0.36));
  centerText(
    `is a registered member in good standing of ABTO for the year ${year}.`,
    height - 315,
    sans,
    13,
    rgb(0.35, 0.38, 0.36)
  );
  centerText(`Member since ${member.member_since}`, height - 355, serifItalic, 13, GOLD);

  page.drawLine({
    start: { x: width / 2 - 110, y: 130 },
    end: { x: width / 2 + 110, y: 130 },
    thickness: 1,
    color: FOREST
  });
  centerText("Secretary General, ABTO", 112, sans, 11, rgb(0.35, 0.38, 0.36));

  const issued = `Issued ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;
  page.drawText(issued, { x: 60, y: 60, size: 9, font: sans, color: rgb(0.5, 0.53, 0.51) });

  const bytes = await pdf.save();
  const filename = `ABTO-Certificate-${member.name.replace(/[^a-zA-Z0-9]+/g, "-")}-${year}.pdf`;

  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
