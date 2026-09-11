import Image from "next/image";
import Link from "next/link";
import type { TourRecord } from "@/lib/queries";

export function TourCard({ tour }: { tour: TourRecord }) {
  return (
    <Link
      href={`/turlarimiz/${tour.slug}`}
      className="group block overflow-hidden bg-white transition"
    >
      {/* Payem banner oranı: 1536×1296 */}
      <div className="relative aspect-[1536/1296] w-full overflow-hidden bg-surface">
        <Image
          src={tour.coverImage || "/images/hero.svg"}
          alt={tour.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:opacity-90"
        />
      </div>
      <div className="px-4 py-6 text-center">
        <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide sm:text-xl">
          {tour.title}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted line-clamp-2">
          {tour.summary}
        </p>
        {tour.price != null && (
          <p className="mt-3 text-sm font-semibold">
            {tour.price.toLocaleString("tr-TR")}{" "}
            {tour.currency === "TRY" ? "₺" : tour.currency === "GBP" ? "£" : tour.currency}
          </p>
        )}
      </div>
    </Link>
  );
}
