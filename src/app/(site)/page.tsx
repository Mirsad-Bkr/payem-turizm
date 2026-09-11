import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TourCard } from "@/components/TourCard";
import { getPage, getSettings, getTours } from "@/lib/queries";

export default async function HomePage() {
  const [settings, intro, featured] = await Promise.all([
    getSettings(),
    getPage("home_intro"),
    getTours({ featured: true }),
  ]);

  const slides = [
    {
      image: "/images/hero.jpg",
      title: settings.heroHeadline,
      subtitle: settings.heroSubline,
      ctaLabel: "Turları Keşfet",
      ctaHref: "/turlarimiz",
    },
    {
      image: "/images/carousel-konaklama.jpg",
      title: "Konaklamalı Turlar",
      subtitle:
        "Konforlu konaklama ile Karadeniz ve yurt dışı rotalarında unutulmaz tatiller.",
      ctaLabel: "Turları İncele",
      ctaHref: "/turlarimiz",
    },
    {
      image: "/images/carousel-vip-transfer.jpg",
      title: "VIP Transfer",
      subtitle:
        "Havalimanı ve şehirler arası transferlerinizde güvenli, konforlu VIP ulaşım.",
      ctaLabel: "Transfer Bilgisi",
      ctaHref: "/hizmetlerimiz/vip-transfer",
    },
  ];

  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-20">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl">
            {intro?.title || "Sizin için Seçtik"}
          </h2>
          <p className="mt-4 text-muted leading-relaxed">{intro?.body}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/turlarimiz"
            className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.14em] underline underline-offset-4"
          >
            Tüm turları gör
          </Link>
        </div>
      </section>
    </>
  );
}
