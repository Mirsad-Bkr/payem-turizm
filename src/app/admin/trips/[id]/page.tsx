import { notFound } from "next/navigation";
import { TripForm } from "@/components/admin/TripForm";
import { getTrips } from "@/lib/queries";

type Props = { params: Promise<{ id: string }> };

export default async function EditTripPage({ params }: Props) {
  const { id } = await params;
  const trips = await getTrips({ all: true });
  const trip = trips.find((t) => String(t.id) === id);
  if (!trip) notFound();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Gezi Düzenle</h1>
      <TripForm trip={trip} />
    </div>
  );
}
