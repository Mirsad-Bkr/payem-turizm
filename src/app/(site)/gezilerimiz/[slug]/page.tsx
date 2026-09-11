import Image from "next/image";
import { notFound } from "next/navigation";
import { getTripBySlug, getTrips } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const trips = await getTrips();
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  return { title: trip?.title || "Gezi" };
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) notFound();

  return (
    <article>
      <div className="relative flex min-h-[220px] items-end overflow-hidden bg-black sm:min-h-[280px] lg:min-h-[360px]">
        <Image
          src={trip.coverImage || "/images/hero.svg"}
          alt={trip.title}
          fill
          sizes="100vw"
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 pt-20 sm:pb-10 sm:pt-24">
          <h1 className="break-words font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            {trip.title}
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <p className="whitespace-pre-line text-base leading-relaxed text-muted">{trip.content}</p>
      </div>
    </article>
  );
}
