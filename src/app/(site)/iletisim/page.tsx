import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getPage, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "İletişim" };

export default async function ContactPage() {
  const [settings, page] = await Promise.all([getSettings(), getPage("contact")]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
        İletişim
      </h1>
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide sm:text-2xl">
        {page?.title}
      </h2>
      <p className="mt-4 text-muted leading-relaxed">{page?.body}</p>

      <div className="mt-10 grid gap-6 border border-border p-5 sm:grid-cols-2 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">E-posta</p>
          <a href={`mailto:${settings.email}`} className="mt-1 block break-all font-medium hover:underline">
            {settings.email}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Telefon</p>
          <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="mt-1 block font-medium hover:underline">
            {settings.phone}
          </a>
          {settings.phoneAlt && (
            <a
              href={`tel:${settings.phoneAlt.replace(/\s/g, "")}`}
              className="mt-1 block font-medium hover:underline"
            >
              {settings.phoneAlt}
            </a>
          )}
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wider text-muted">Adres</p>
          <p className="mt-1 break-words font-medium">{settings.address}</p>
        </div>
      </div>

      <div className="mt-8">
        <WhatsAppButton
          phone={settings.whatsappNumber}
          label="WhatsApp ile Yazın"
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
