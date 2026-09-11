import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTrips } from "@/lib/queries";

export const metadata: Metadata = { title: "Gezilerimiz" };

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
        Gezilerimiz
      </h1>
      <p className="mt-4 max-w-2xl text-muted">Keşfedilecek yaylalar, tarihi noktalar ve doğa rotaları.</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/gezilerimiz/${trip.slug}`}
            className="group overflow-hidden border border-border transition hover:border-black"
          >
            <div className="relative aspect-[4/3] bg-surface">
              <Image
                src={trip.coverImage || "/images/hero.svg"}
                alt={trip.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide sm:text-xl">
                {trip.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{trip.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
