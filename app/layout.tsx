import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import "@/styles/site.css";
import IconSprite from "@/components/site/icon-sprite";
import ScrollReveal from "@/components/site/reveal";
import ScrollChrome from "@/components/site/scroll-chrome";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import { ToastProvider } from "@/components/site/toast";
import { ModalProvider } from "@/components/site/modal";
import { getLiveData } from "@/lib/live-data";

const favicon = fs
  .readFileSync(path.join(process.cwd(), "legacy/favicon-data-uri.txt"), "utf8")
  .trim();

const ldJson = fs.readFileSync(
  path.join(process.cwd(), "legacy/ldjson.json"),
  "utf8"
);

export const metadata: Metadata = {
  title: "ABTO | Association of Bhutanese Tour Operators | Supporting Sustainable Tourism",
  description:
    "The Association of Bhutanese Tour Operators (ABTO), founded in 2000, is the official voice of Bhutan's licensed tour operators. Member directory, membership registration, policy library, training and travel resources.",
  keywords:
    "ABTO, Bhutan tour operators, Bhutan tourism, sustainable tourism, Gross National Happiness, Bhutan travel, tour operator association",
  alternates: { canonical: "https://abto.org.bt/" },
  openGraph: {
    type: "website",
    siteName: "Association of Bhutanese Tour Operators",
    title: "ABTO | Supporting Sustainable Tourism. Connecting Bhutan to the World.",
    description:
      "The official voice of Bhutan's licensed tour operators since 2000. Find a member, join the association, and access policy, training and travel resources.",
    url: "https://abto.org.bt/",
    locale: "en_BT",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABTO | Association of Bhutanese Tour Operators",
    description: "The official voice of Bhutan's licensed tour operators since 2000.",
  },
  icons: { icon: favicon },
};

export const viewport = {
  themeColor: "#1E3A2F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const liveData = await getLiveData();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <IconSprite />
        <a href="#main" className="btn btn-sm skip-link">
          <span>Skip to content</span>
        </a>
        <ScrollChrome />
        <ToastProvider>
          <ModalProvider>
            <Header liveData={liveData} />
            <main id="main">{children}</main>
            <Footer />
          </ModalProvider>
        </ToastProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
