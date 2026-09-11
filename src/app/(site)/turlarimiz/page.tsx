import type { Metadata } from "next";
import { TourCard } from "@/components/TourCard";
import { getTours } from "@/lib/queries";

export const metadata: Metadata = { title: "Turlarımız" };

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
        Turlarımız
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Günübirlik Karadeniz turlarından yurt dışı paketlerine kadar seçili rotalarımız.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
