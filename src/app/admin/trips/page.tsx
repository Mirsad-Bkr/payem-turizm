import Link from "next/link";
import { deleteTrip } from "@/lib/admin-actions";
import { getTrips } from "@/lib/queries";

export default async function AdminTripsPage() {
  const trips = await getTrips({ all: true });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Geziler</h1>
        <Link href="/admin/trips/new" className="bg-black px-4 py-2 text-sm uppercase tracking-wider text-white">
          Yeni Gezi
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {trips.map((trip) => (
          <div key={trip.id} className="flex items-center justify-between border border-border bg-white px-4 py-3">
            <div>
              <p className="font-medium">{trip.title}</p>
              <p className="text-xs text-muted">{trip.slug}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/trips/${trip.id}`} className="underline">
                Düzenle
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteTrip(trip.id);
                }}
              >
                <button type="submit" className="text-red-600 underline">
                  Sil
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
