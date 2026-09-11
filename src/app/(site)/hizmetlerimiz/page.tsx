import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = { title: "Hizmetlerimiz" };

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
        Hizmetlerimiz
      </h1>
      <p className="mt-4 max-w-2xl text-muted">VIP transfer, araç kiralama ve bilet organizasyonu.</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/hizmetlerimiz/${service.slug}`}
            className="border border-border p-6 transition hover:border-black hover:bg-surface sm:p-8"
          >
            <h2 className="break-words font-[family-name:var(--font-display)] text-xl uppercase tracking-wide sm:text-2xl">
              {service.title}
            </h2>
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">{service.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
