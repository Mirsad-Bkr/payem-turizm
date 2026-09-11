import Link from "next/link";
import { deleteService } from "@/lib/admin-actions";
import { getServices } from "@/lib/queries";

export default async function AdminServicesPage() {
  const services = await getServices({ all: true });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Hizmetler</h1>
        <Link href="/admin/services/new" className="bg-black px-4 py-2 text-sm uppercase tracking-wider text-white">
          Yeni Hizmet
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between border border-border bg-white px-4 py-3">
            <div>
              <p className="font-medium">{service.title}</p>
              <p className="text-xs text-muted">{service.slug}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/services/${service.id}`} className="underline">
                Düzenle
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteService(service.id);
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
