import { notFound } from "next/navigation";
import { TourForm } from "@/components/admin/TourForm";
import { getTours } from "@/lib/queries";

type Props = { params: Promise<{ id: string }> };

export default async function EditTourPage({ params }: Props) {
  const { id } = await params;
  const tours = await getTours({ all: true });
  const tour = tours.find((t) => String(t.id) === id);
  if (!tour) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Tur Düzenle</h1>
      <TourForm tour={tour} />
    </div>
  );
}
