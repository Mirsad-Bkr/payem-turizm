import { asc, eq } from "drizzle-orm";
import {
  SEED_PAGES,
  SEED_SERVICES,
  SEED_SETTINGS,
  SEED_TOURS,
  SEED_TRIPS,
} from "@/db/seed-data";
import type { PricingRow, TourContent } from "@/db/schema";

export type TourRecord = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: TourContent;
  price: number | null;
  currency: string;
  destination: string | null;
  coverImage: string | null;
  heroImage: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export type TripRecord = {
  id: number;
  slug: string;
  title: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  sortOrder: number;
};

export type ServiceRecord = {
  id: number;
  slug: string;
  title: string;
  content: string;
  pricingTable: PricingRow[] | null;
  coverImage: string | null;
  published: boolean;
  sortOrder: number;
};

export type SettingsRecord = typeof SEED_SETTINGS;
export type PageRecord = { key: string; title: string; body: string };

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

async function getDb() {
  const { db } = await import("@/db");
  return db;
}

export async function getSettings(): Promise<SettingsRecord> {
  if (!hasDatabase()) return SEED_SETTINGS;
  try {
    const db = await getDb();
    const { siteSettings } = await import("@/db/schema");
    const rows = await db.select().from(siteSettings).limit(1);
    const row = rows[0];
    if (!row) return SEED_SETTINGS;
    return {
      phone: row.phone,
      phoneAlt: row.phoneAlt,
      email: row.email,
      address: row.address,
      whatsappNumber: row.whatsappNumber,
      heroHeadline: row.heroHeadline,
      heroSubline: row.heroSubline,
      topBarLeft: row.topBarLeft,
      topBarRight: row.topBarRight,
      facebookUrl: row.facebookUrl || "",
      instagramUrl: row.instagramUrl || "",
    };
  } catch {
    return SEED_SETTINGS;
  }
}

export async function getPage(key: string): Promise<PageRecord | null> {
  if (!hasDatabase()) {
    return SEED_PAGES.find((p) => p.key === key) ?? null;
  }
  try {
    const db = await getDb();
    const { pageContents } = await import("@/db/schema");
    const rows = await db.select().from(pageContents).where(eq(pageContents.key, key)).limit(1);
    const row = rows[0];
    if (!row) return SEED_PAGES.find((p) => p.key === key) ?? null;
    return { key: row.key, title: row.title, body: row.body };
  } catch {
    return SEED_PAGES.find((p) => p.key === key) ?? null;
  }
}

export async function getPages(): Promise<PageRecord[]> {
  if (!hasDatabase()) return SEED_PAGES;
  try {
    const db = await getDb();
    const { pageContents } = await import("@/db/schema");
    const rows = await db.select().from(pageContents);
    return rows.length ? rows.map((r) => ({ key: r.key, title: r.title, body: r.body })) : SEED_PAGES;
  } catch {
    return SEED_PAGES;
  }
}

export async function getTours(opts?: { featured?: boolean; all?: boolean }): Promise<TourRecord[]> {
  if (!hasDatabase()) {
    let list = SEED_TOURS.map((t, i) => ({ id: i + 1, ...t }));
    if (!opts?.all) list = list.filter((t) => t.published);
    if (opts?.featured) list = list.filter((t) => t.featured);
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  try {
    const db = await getDb();
    const { tours } = await import("@/db/schema");
    let rows = await db.select().from(tours).orderBy(asc(tours.sortOrder));
    if (!opts?.all) rows = rows.filter((t) => t.published);
    if (opts?.featured) rows = rows.filter((t) => t.featured);
    return rows.map((t) => ({
      ...t,
      content: t.content as TourContent,
    }));
  } catch {
    let list = SEED_TOURS.map((t, i) => ({ id: i + 1, ...t }));
    if (!opts?.all) list = list.filter((t) => t.published);
    if (opts?.featured) list = list.filter((t) => t.featured);
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export async function getTourBySlug(slug: string): Promise<TourRecord | null> {
  const tours = await getTours({ all: true });
  return tours.find((t) => t.slug === slug && t.published) ?? null;
}

export async function getTrips(opts?: { all?: boolean }): Promise<TripRecord[]> {
  if (!hasDatabase()) {
    let list = SEED_TRIPS.map((t, i) => ({ id: i + 1, ...t }));
    if (!opts?.all) list = list.filter((t) => t.published);
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  try {
    const db = await getDb();
    const { trips } = await import("@/db/schema");
    let rows = await db.select().from(trips).orderBy(asc(trips.sortOrder));
    if (!opts?.all) rows = rows.filter((t) => t.published);
    return rows;
  } catch {
    let list = SEED_TRIPS.map((t, i) => ({ id: i + 1, ...t }));
    if (!opts?.all) list = list.filter((t) => t.published);
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export async function getTripBySlug(slug: string): Promise<TripRecord | null> {
  const trips = await getTrips({ all: true });
  return trips.find((t) => t.slug === slug && t.published) ?? null;
}

export async function getServices(opts?: { all?: boolean }): Promise<ServiceRecord[]> {
  if (!hasDatabase()) {
    let list = SEED_SERVICES.map((t, i) => ({ id: i + 1, ...t }));
    if (!opts?.all) list = list.filter((t) => t.published);
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  try {
    const db = await getDb();
    const { services } = await import("@/db/schema");
    let rows = await db.select().from(services).orderBy(asc(services.sortOrder));
    if (!opts?.all) rows = rows.filter((t) => t.published);
    return rows.map((s) => ({
      ...s,
      pricingTable: (s.pricingTable as PricingRow[] | null) ?? [],
    }));
  } catch {
    let list = SEED_SERVICES.map((t, i) => ({ id: i + 1, ...t }));
    if (!opts?.all) list = list.filter((t) => t.published);
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  const services = await getServices({ all: true });
  return services.find((t) => t.slug === slug && t.published) ?? null;
}
