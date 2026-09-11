import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/queries";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Ayarlar</h1>
      <p className="mt-2 text-sm text-muted">İletişim, WhatsApp ve hero metinleri</p>
      <SettingsForm settings={settings} />
    </div>
  );
}
