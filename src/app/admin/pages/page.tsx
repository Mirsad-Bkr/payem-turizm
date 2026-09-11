import { PagesManager } from "@/components/admin/PagesManager";
import { getPages } from "@/lib/queries";

export default async function AdminPagesPage() {
  const pages = await getPages();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Sayfalar</h1>
      <p className="mt-2 text-sm text-muted">Hakkımızda, iletişim ve ana sayfa metinleri</p>
      <PagesManager pages={pages} />
    </div>
  );
}
