import "dotenv/config";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  SEED_PAGES,
  SEED_SERVICES,
  SEED_SETTINGS,
  SEED_TOURS,
  SEED_TRIPS,
} from "./seed-data";
import { admins, pageContents, services, siteSettings, tours, trips } from "./schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL eksik. .env.local dosyasına Neon connection string ekleyin.");
  }

  const sql = neon(url);
  const db = drizzle(sql);

  const email = process.env.ADMIN_EMAIL || "admin@payemtravel.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  console.log("Seeding...");

  await db.delete(tours);
  await db.delete(trips);
  await db.delete(services);
  await db.delete(pageContents);
  await db.delete(siteSettings);
  await db.delete(admins);

  await db.insert(admins).values({ email, passwordHash });
  await db.insert(siteSettings).values(SEED_SETTINGS);
  await db.insert(pageContents).values(SEED_PAGES);
  await db.insert(tours).values(SEED_TOURS);
  await db.insert(trips).values(SEED_TRIPS);
  await db.insert(services).values(SEED_SERVICES);

  console.log("Seed tamamlandı.");
  console.log(`Admin: ${email} / ${password}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
