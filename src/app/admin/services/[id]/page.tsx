import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { getServices } from "@/lib/queries";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const services = await getServices({ all: true });
  const service = services.find((s) => String(s.id) === id);
  if (!service) notFound();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Hizmet Düzenle</h1>
      <ServiceForm service={service} />
    </div>
  );
}
