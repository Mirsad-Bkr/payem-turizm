import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const nav = [
  { href: "/admin", label: "Özet" },
  { href: "/admin/tours", label: "Turlar" },
  { href: "/admin/trips", label: "Geziler" },
  { href: "/admin/services", label: "Hizmetler" },
  { href: "/admin/pages", label: "Sayfalar" },
  { href: "/admin/settings", label: "Ayarlar" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-surface">
      {session && (
        <header className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/admin" className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide">
                Payem Admin
              </Link>
              <nav className="flex flex-wrap gap-3 text-sm">
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} className="text-muted hover:text-black">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/" className="text-muted hover:text-black">
                Siteye dön
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/admin/login" });
                }}
              >
                <button type="submit" className="bg-black px-3 py-1.5 text-white">
                  Çıkış
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
