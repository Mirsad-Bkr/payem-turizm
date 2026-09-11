import Link from "next/link";
import { getServices, getTours, getTrips } from "@/lib/queries";

export default async function AdminDashboardPage() {
  const [tours, trips, services] = await Promise.all([
    getTours({ all: true }),
    getTrips({ all: true }),
    getServices({ all: true }),
  ]);

  const cards = [
    { label: "Turlar", count: tours.length, href: "/admin/tours" },
    { label: "Geziler", count: trips.length, href: "/admin/trips" },
    { label: "Hizmetler", count: services.length, href: "/admin/services" },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl uppercase tracking-wide">Özet</h1>
      <p className="mt-2 text-muted">İçerik yönetimi ve site ayarları</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="border border-border bg-white p-6 hover:border-black">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl">{card.count}</p>
          </Link>
        ))}
      </div>
      {!process.env.DATABASE_URL?.trim() && (
        <div className="mt-8 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          `DATABASE_URL` tanımlı değil. Site seed verisiyle çalışıyor. Neon bağlantısını `.env.local` içine
          ekleyip `npm run db:push` ve `npm run db:seed` çalıştırın; admin CRUD kalıcı kayıt için Neon
          gerektirir.
        </div>
      )}
    </div>
  );
}
