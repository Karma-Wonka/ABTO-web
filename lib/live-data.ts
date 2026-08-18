import 'server-only';
import { cache } from 'react';
import { query } from './postgres';

type MemberRow = {
  id: number;
  name: string;
  region: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  specialties: string;
  languages: string;
  member_since: number;
  status: string;
};

type EventRow = {
  id: number;
  date: string;
  title: string;
  location: string;
  type: string;
  description: string;
  capacity: number;
  is_past: number;
  detail_link: string | null;
};

type NewsRow = {
  id: number;
  date: string;
  category: string;
  title: string;
  body: string;
};

type DocumentRow = {
  id: number;
  kind: 'download' | 'publication';
  title: string;
  category: string | null;
  doc_type: string;
  size: string | null;
  year: string | null;
  description: string | null;
  image_key: string | null;
};

type FestivalRow = {
  id: number;
  name: string;
  place: string;
  dzongkhag: string;
  date_2025: string | null;
  date_2026: string | null;
  display_order: number;
};

const CATEGORY_TAGS: Record<string, string> = {
  Policy: 't-yellow',
  Association: 't-red',
  Sustainability: 't-green',
  Aviation: 't-blue',
  Markets: 't-blue',
  Festivals: 't-yellow'
};

/**
 * Live content pulled from the same Neon Postgres database the ABTO admin
 * dashboard (../ABTO) manages.
 */
export const getLiveData = cache(async function getLiveData() {
  const [members, events, news, documents, festivals, festivalCalendar] = await Promise.all([
    query<MemberRow>("SELECT * FROM members WHERE status = 'active' ORDER BY name"),
    query<EventRow>('SELECT * FROM events ORDER BY date DESC'),
    query<NewsRow>('SELECT * FROM news ORDER BY date DESC'),
    query<DocumentRow>('SELECT * FROM documents ORDER BY created_at DESC'),
    query<FestivalRow>('SELECT * FROM festivals ORDER BY display_order ASC, name ASC'),
    query<{ pdf_key: string | null }>('SELECT pdf_key FROM festival_calendar WHERE id = 1')
  ]);

  return {
    members: members.rows.map((m) => ({
      id: m.id,
      name: m.name,
      region: m.region,
      phone: m.phone,
      email: m.email,
      web: m.website,
      desc: m.description,
      specs: JSON.parse(m.specialties) as string[],
      since: m.member_since,
      sample: false,
      langs: JSON.parse(m.languages) as string[]
    })),
    events: events.rows.map((e) => ({
      d: e.date,
      t: e.title,
      loc: e.location,
      type: e.type,
      x: e.description,
      cap: e.capacity,
      past: e.is_past === 1,
      detail: e.detail_link ?? undefined
    })),
    news: news.rows.map((n) => ({
      d: n.date,
      cat: n.category,
      tag: CATEGORY_TAGS[n.category] ?? 't-blue',
      t: n.title,
      x: n.body
    })),
    downloads: documents.rows
      .filter((d) => d.kind === 'download')
      .map((d) => ({
        t: d.title,
        cat: d.category ?? '',
        size: d.size ?? '',
        type: d.doc_type
      })),
    publications: documents.rows
      .filter((d) => d.kind === 'publication')
      .map((d) => ({
        id: d.id,
        t: d.title,
        yr: d.year ?? '',
        x: d.description ?? '',
        type: d.doc_type,
        // Never expose the raw R2 key here — resolved to a signed link
        // per request by app/api/document-image/[id]/route.ts instead.
        hasImage: !!d.image_key
      })),
    festivals: festivals.rows.map((f) => ({
      n: f.name,
      p: f.place,
      dz: f.dzongkhag,
      d25: f.date_2025 ?? '',
      d26: f.date_2026 ?? ''
    })),
    // Never expose the raw R2 key/URL here — the bucket is private, so the
    // actual link is signed fresh per request behind a member-only route
    // (app/api/festival-calendar/route.ts). This just says whether one exists.
    hasFestivalCalendarPdf: !!festivalCalendar.rows[0]?.pdf_key
  };
});

export type LiveData = Awaited<ReturnType<typeof getLiveData>>;
