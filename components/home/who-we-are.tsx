import Link from "next/link";
import Reveal from "@/components/site/rv";

export default function WhoWeAre() {
  return (
    <section className="pad" id="who">
      <div className="wrap split">
        <Reveal className="sp-media">
          <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="w1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2C4034" /><stop offset="1" stopColor="#16281F" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#w1)" />
            <path d="M0,300 L70,250 L140,290 L210,240 L290,296 L360,252 L400,286 L400,500 L0,500 Z" fill="#1B3227" />
            <path d="M0,372 L90,336 L190,378 L300,340 L400,382 L400,500 L0,500 Z" fill="#132119" />
            <g transform="translate(128,196)" fill="#0E1913">
              <rect x="0" y="52" width="148" height="120" /><rect x="54" y="14" width="42" height="40" />
              <path d="M-16,52 L74,24 L164,52 Z" /><path d="M46,16 L74,0 L102,16 Z" />
              <rect x="0" y="68" width="148" height="9" fill="#8C2B23" /><rect x="0" y="77" width="148" height="2.5" fill="#C08B3E" />
              <g fill="#C08B3E" opacity=".5"><rect x="14" y="96" width="12" height="22" /><rect x="44" y="96" width="12" height="22" /><rect x="92" y="96" width="12" height="22" /><rect x="122" y="96" width="12" height="22" /></g>
              <g fill="#C08B3E" opacity=".38"><rect x="14" y="132" width="12" height="22" /><rect x="44" y="132" width="12" height="22" /><rect x="92" y="132" width="12" height="22" /><rect x="122" y="132" width="12" height="22" /></g>
            </g>
            <circle cx="300" cy="96" r="52" fill="#C08B3E" opacity=".1" />
          </svg>
          <img
            src="/img/big-buddha-lg.webp"
            alt="Buddha Dordenma, Thimphu"
            loading="eager"
            decoding="async"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="cap">Buddha Dordenma overlooking Thimphu, courtesy Original Bhutan Travels</div>
        </Reveal>
        <Reveal>
          <div className="eyebrow">Who We Are</div>
          <h2 className="display-l">The mutual and official voice of Bhutan&rsquo;s tour operators.</h2>
          <p className="lead" style={{ marginTop: "1.6rem" }}>
            ABTO is the recognised representative of the tour operators in Bhutan. Since its founding in 2000, our
            priority has been to bring about positive change for the effective function, administration and
            operation of tour operators.
          </p>
          <p>
            We represent and protect the collective interests of the country&rsquo;s tourism industry. As a
            service-providing organisation we render every support and assistance in undertaking activities that
            members cannot take up individually, and we seek ways and means to advance the cause of member tour
            operators.
          </p>
          <div className="quote">
            To develop and promote the Bhutanese tourism industry with the highest standards of service, ethics and
            professionalism, in line with the vision of Gross National Happiness.
            <br />
            <span
              style={{
                fontFamily: "var(--f-util)",
                fontStyle: "normal",
                fontSize: ".65rem",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--stone)",
                display: "block",
                marginTop: "1rem"
              }}
            >
              ABTO&rsquo;s Purpose
            </span>
          </div>
          <Link href="/about" className="txtlink">
            Read the full charter <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
