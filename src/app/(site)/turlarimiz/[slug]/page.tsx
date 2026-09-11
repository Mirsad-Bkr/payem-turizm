import Image from "next/image";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSettings, getTourBySlug, getTours } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  return { title: tour?.title || "Tur" };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const [tour, settings] = await Promise.all([getTourBySlug(slug), getSettings()]);
  if (!tour) notFound();

  const content = tour.content;

  return (
    <article>
      <div className="relative flex min-h-[260px] items-end overflow-hidden bg-black sm:min-h-[320px] lg:min-h-[420px]">
        <Image
          src={tour.heroImage || tour.coverImage || "/images/hero.jpg"}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:pb-10 sm:pt-28">
          <h1 className="break-words font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            {tour.title}
          </h1>
          {tour.summary && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 line-clamp-3 sm:text-base sm:line-clamp-none">
              {tour.summary}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[1.4fr_0.8fr]">
        <aside className="h-fit border border-border bg-surface p-5 sm:p-6 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28">
          {tour.destination && (
            <p className="text-sm text-muted">
              Destinasyon: <span className="text-black">{tour.destination}</span>
            </p>
          )}
          {tour.price != null && (
            <p className="mt-4 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide sm:text-3xl">
              {tour.price.toLocaleString("tr-TR")}{" "}
              {tour.currency === "TRY" ? "₺" : tour.currency === "GBP" ? "£" : tour.currency}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Rezervasyon ve güncel müsaitlik için WhatsApp üzerinden bize ulaşın.
          </p>
          <div className="mt-6">
            <WhatsAppButton phone={settings.whatsappNumber} tourTitle={tour.title} className="w-full" />
          </div>
        </aside>

        <div className="space-y-10 lg:col-start-1 lg:row-start-1">
          {content.program?.length > 0 && (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide sm:text-2xl">
                Tur Programı
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                {content.program.map((item) => (
                  <li key={item} className="border-b border-border py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(content.departureTimes?.length > 0 || content.returnTimes?.length > 0) && (
            <section className="grid gap-6 sm:grid-cols-2">
              {content.departureTimes?.length > 0 && (
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide">
                    Tur başlangıç saati
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    {content.departureTimes.map((t) => (
                      <li key={`${t.location}-${t.time}`}>
                        {t.location}: {t.time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {content.returnTimes?.length > 0 && (
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide">
                    Tur bitiş saati
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    {content.returnTimes.map((t) => (
                      <li key={`${t.location}-${t.time}`}>
                        {t.location}: {t.time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <section className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide">
                Ücrete dahil
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {(content.included ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide">
                Ücrete dahil değil
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {(content.excluded ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          {content.packingList && content.packingList.length > 0 && (
            <section className="border border-border bg-surface p-5 sm:p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide sm:text-2xl">
                Yanınıza almayı unutmayın
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {content.packingList.map((item) => (
                  <li key={item} className="font-medium">
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
