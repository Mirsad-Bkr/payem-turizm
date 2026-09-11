import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getServiceBySlug, getServices, getSettings } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return { title: service?.title || "Hizmet" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSettings()]);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <h1 className="break-words font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
        {service.title}
      </h1>
      <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted">{service.content}</p>

      {service.pricingTable && service.pricingTable.length > 0 && (
        <div className="mt-12 overflow-x-auto border border-border">
          <table className="min-w-[480px] w-full text-left text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3 font-[family-name:var(--font-display)] uppercase tracking-wider">
                  Güzergâh
                </th>
                <th className="px-4 py-3 font-[family-name:var(--font-display)] uppercase tracking-wider">
                  Tarif
                </th>
              </tr>
            </thead>
            <tbody>
              {service.pricingTable.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="px-4 py-3">{row.label}</td>
                  <td className="px-4 py-3 font-semibold">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10">
        <WhatsAppButton
          phone={settings.whatsappNumber}
          label="WhatsApp ile Bilgi Al"
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
