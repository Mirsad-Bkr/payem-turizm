import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type TourContent = {
  program: string[];
  included: string[];
  excluded: string[];
  departureTimes: { location: string; time: string }[];
  returnTimes: { location: string; time: string }[];
  packingList?: string[];
};

export type PricingRow = {
  label: string;
  price: string;
};

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary").notNull().default(""),
  content: jsonb("content").$type<TourContent>().notNull(),
  price: integer("price"),
  currency: varchar("currency", { length: 8 }).notNull().default("TRY"),
  destination: varchar("destination", { length: 255 }).default(""),
  coverImage: text("cover_image").default(""),
  heroImage: text("hero_image").default(""),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image").default(""),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull().default(""),
  pricingTable: jsonb("pricing_table").$type<PricingRow[]>().default([]),
  coverImage: text("cover_image").default(""),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  phone: varchar("phone", { length: 64 }).notNull().default(""),
  phoneAlt: varchar("phone_alt", { length: 64 }).notNull().default(""),
  email: varchar("email", { length: 255 }).notNull().default(""),
  address: text("address").notNull().default(""),
  whatsappNumber: varchar("whatsapp_number", { length: 32 }).notNull().default(""),
  heroHeadline: text("hero_headline").notNull().default(""),
  heroSubline: text("hero_subline").notNull().default(""),
  topBarLeft: text("top_bar_left").notNull().default(""),
  topBarRight: text("top_bar_right").notNull().default(""),
  facebookUrl: text("facebook_url").default(""),
  instagramUrl: text("instagram_url").default(""),
});

export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull().default(""),
  body: text("body").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
