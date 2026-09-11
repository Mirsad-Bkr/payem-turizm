import Link from "next/link";
import { deleteTour } from "@/lib/admin-actions";
import { getTours } from "@/lib/queries";

export default async function AdminToursPage() {
  const tours = await getTours({ all: true });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Turlar</h1>
        <Link href="/admin/tours/new" className="bg-black px-4 py-2 text-sm uppercase tracking-wider text-white">
          Yeni Tur
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-3 py-2">Başlık</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Fiyat</th>
              <th className="px-3 py-2">Durum</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-t border-border">
                <td className="px-3 py-2">{tour.title}</td>
                <td className="px-3 py-2 text-muted">{tour.slug}</td>
                <td className="px-3 py-2">{tour.price ?? "-"}</td>
                <td className="px-3 py-2">{tour.published ? "Yayında" : "Taslak"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/admin/tours/${tour.id}`} className="underline">
                      Düzenle
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteTour(tour.id);
                      }}
                    >
                      <button type="submit" className="text-red-600 underline">
                        Sil
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
