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
  kind: 'download' | 'publication' | 'calendar';
  title: string;
  category: string | null;
  doc_type: string;
  size: string | null;
  year: string | null;
  description: string | null;
  file_url: string | null;
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
  const [members, events, news, documents] = await Promise.all([
    query<MemberRow>("SELECT * FROM members WHERE status = 'active' ORDER BY name"),
    query<EventRow>('SELECT * FROM events ORDER BY date DESC'),
    query<NewsRow>('SELECT * FROM news ORDER BY date DESC'),
    query<DocumentRow>('SELECT * FROM documents ORDER BY created_at DESC')
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
        type: d.doc_type,
        url: d.file_url
      })),
    publications: documents.rows
      .filter((d) => d.kind === 'publication')
      .map((d) => ({
        t: d.title,
        yr: d.year ?? '',
        x: d.description ?? '',
        type: d.doc_type,
        url: d.file_url
      })),
    // The single current Event Calendar PDF, set from the admin dashboard's
    // Documents screen (kind: 'calendar'). If more than one exists, the
    // most recently created wins.
    eventCalendar: (() => {
      const d = documents.rows.find((row) => row.kind === 'calendar' && row.file_url);
      return d ? { title: d.title, url: d.file_url as string } : null;
    })()
  };
});

export type LiveData = Awaited<ReturnType<typeof getLiveData>>;
