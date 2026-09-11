import Image from "next/image";
import Link from "next/link";
import type { SettingsRecord } from "@/lib/queries";

const footerLinks = [
  { href: "/turlarimiz", label: "Turlarımız" },
  { href: "/gezilerimiz", label: "Gezilerimiz" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteFooter({ settings }: { settings: SettingsRecord }) {
  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="Payem Turizm"
              width={847}
              height={480}
              className="h-10 w-auto invert"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Karadeniz’in doğası ve kültüründen ilham alan turlar, geziler ve özel transfer hizmetleri.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg uppercase tracking-wider">
            Menü
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/hizmetlerimiz/vip-transfer" className="hover:text-white">
                VIP Transfer
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg uppercase tracking-wider">
            İletişim
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
            {settings.phoneAlt && (
              <li>
                <a href={`tel:${settings.phoneAlt.replace(/\s/g, "")}`} className="hover:text-white">
                  {settings.phoneAlt}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${settings.email}`} className="break-all hover:text-white">
                {settings.email}
              </a>
            </li>
            <li className="break-words pt-1 leading-relaxed">{settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Payem Turizm. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
