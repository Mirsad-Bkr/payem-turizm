"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import type { PricingRow, TourContent } from "@/db/schema";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Yetkisiz");
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL gerekli. Neon bağlantısını .env.local dosyasına ekleyin.");
  }
  const { db } = await import("@/db");
  return db;
}

function parseTourContent(form: FormData, existing?: TourContent | null): TourContent {
  const program = String(form.get("program") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const included = String(form.get("included") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const excluded = String(form.get("excluded") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const packingList = String(form.get("packingList") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    program,
    included,
    excluded,
    departureTimes: existing?.departureTimes ?? [],
    returnTimes: existing?.returnTimes ?? [],
    packingList,
  };
}

export async function saveTour(formData: FormData) {
  const db = await requireAdmin();
  const { tours } = await import("@/db/schema");
  const id = Number(formData.get("id") || 0);

  let existing: { content: TourContent; heroImage: string | null } | null = null;
  if (id) {
    const rows = await db.select().from(tours).where(eq(tours.id, id)).limit(1);
    const row = rows[0];
    if (row) {
      existing = {
        content: row.content as TourContent,
        heroImage: row.heroImage,
      };
    }
  }

  const priceRaw = String(formData.get("price") || "").trim();
  const data = {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    summary: String(formData.get("summary") || ""),
    content: parseTourContent(formData, existing?.content),
    price: priceRaw ? Number(priceRaw) : null,
    currency: String(formData.get("currency") || "TRY"),
    destination: String(formData.get("destination") || ""),
    coverImage: String(formData.get("coverImage") || "/images/hero.svg"),
    heroImage: existing?.heroImage || "",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(tours).set(data).where(eq(tours.id, id));
  } else {
    await db.insert(tours).values(data);
  }
  revalidatePath("/");
  revalidatePath("/turlarimiz");
  revalidatePath(`/turlarimiz/${data.slug}`);
  revalidatePath("/admin/tours");
}

export async function deleteTour(id: number) {
  const db = await requireAdmin();
  const { tours } = await import("@/db/schema");
  await db.delete(tours).where(eq(tours.id, id));
  revalidatePath("/turlarimiz");
  revalidatePath("/admin/tours");
}

export async function saveTrip(formData: FormData) {
  const db = await requireAdmin();
  const { trips } = await import("@/db/schema");
  const id = Number(formData.get("id") || 0);
  const data = {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    content: String(formData.get("content") || ""),
    coverImage: String(formData.get("coverImage") || "/images/hero.svg"),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
    updatedAt: new Date(),
  };
  if (id) await db.update(trips).set(data).where(eq(trips.id, id));
  else await db.insert(trips).values(data);
  revalidatePath("/gezilerimiz");
  revalidatePath("/admin/trips");
}

export async function deleteTrip(id: number) {
  const db = await requireAdmin();
  const { trips } = await import("@/db/schema");
  await db.delete(trips).where(eq(trips.id, id));
  revalidatePath("/gezilerimiz");
  revalidatePath("/admin/trips");
}

export async function saveService(formData: FormData) {
  const db = await requireAdmin();
  const { services } = await import("@/db/schema");
  const id = Number(formData.get("id") || 0);
  const pricingRaw = String(formData.get("pricingTable") || "").trim();
  let pricingTable: PricingRow[] = [];
  if (pricingRaw) {
    pricingTable = pricingRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, price] = line.split("|").map((s) => s.trim());
        return { label: label || "", price: price || "" };
      });
  }
  const data = {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    content: String(formData.get("content") || ""),
    pricingTable,
    coverImage: String(formData.get("coverImage") || "/images/hero.svg"),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
    updatedAt: new Date(),
  };
  if (id) await db.update(services).set(data).where(eq(services.id, id));
  else await db.insert(services).values(data);
  revalidatePath("/hizmetlerimiz");
  revalidatePath("/admin/services");
}

export async function deleteService(id: number) {
  const db = await requireAdmin();
  const { services } = await import("@/db/schema");
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/hizmetlerimiz");
  revalidatePath("/admin/services");
}

export async function savePage(formData: FormData) {
  const db = await requireAdmin();
  const { pageContents } = await import("@/db/schema");
  const key = String(formData.get("key"));
  await db
    .update(pageContents)
    .set({
      title: String(formData.get("title") || ""),
      body: String(formData.get("body") || ""),
      updatedAt: new Date(),
    })
    .where(eq(pageContents.key, key));
  revalidatePath("/");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");
  revalidatePath("/admin/pages");
}

export async function saveSettings(formData: FormData) {
  const db = await requireAdmin();
  const { siteSettings } = await import("@/db/schema");
  const rows = await db.select().from(siteSettings).limit(1);
  const data = {
    phone: String(formData.get("phone") || ""),
    phoneAlt: String(formData.get("phoneAlt") || ""),
    email: String(formData.get("email") || ""),
    address: String(formData.get("address") || ""),
    whatsappNumber: String(formData.get("whatsappNumber") || "").replace(/\D/g, ""),
    heroHeadline: String(formData.get("heroHeadline") || ""),
    heroSubline: String(formData.get("heroSubline") || ""),
    topBarLeft: String(formData.get("topBarLeft") || ""),
    topBarRight: String(formData.get("topBarRight") || ""),
    facebookUrl: String(formData.get("facebookUrl") || ""),
    instagramUrl: String(formData.get("instagramUrl") || ""),
  };
  if (rows[0]) await db.update(siteSettings).set(data).where(eq(siteSettings.id, rows[0].id));
  else await db.insert(siteSettings).values(data);
  revalidatePath("/");
  revalidatePath("/iletisim");
  revalidatePath("/admin/settings");
}
