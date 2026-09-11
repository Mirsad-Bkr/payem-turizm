"use client";

import { useState } from "react";
import { saveSettings } from "@/lib/admin-actions";
import type { SettingsRecord } from "@/lib/queries";

export function SettingsForm({ settings }: { settings: SettingsRecord }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        setMessage("");
        setError("");
        try {
          await saveSettings(formData);
          setMessage("Ayarlar kaydedildi.");
        } catch (e) {
          setError(e instanceof Error ? e.message : "Kayıt başarısız");
        } finally {
          setLoading(false);
        }
      }}
      className="mt-6 max-w-3xl space-y-4 border border-border bg-white p-6"
    >
      {(
        [
          ["phone", "Telefon", settings.phone],
          ["phoneAlt", "Telefon (alternatif)", settings.phoneAlt],
          ["email", "E-posta", settings.email],
          ["whatsappNumber", "WhatsApp numarası (9055...)", settings.whatsappNumber],
          ["address", "Adres", settings.address],
          ["heroHeadline", "Hero başlık", settings.heroHeadline],
          ["heroSubline", "Hero alt metin", settings.heroSubline],
          ["topBarLeft", "Üst bar sol", settings.topBarLeft],
          ["topBarRight", "Üst bar sağ", settings.topBarRight],
          ["facebookUrl", "Facebook URL", settings.facebookUrl],
          ["instagramUrl", "Instagram URL", settings.instagramUrl],
        ] as const
      ).map(([name, label, value]) => (
        <label key={name} className="block text-sm">
          {label}
          <input name={name} defaultValue={value} className="mt-1 w-full border border-border px-3 py-2" />
        </label>
      ))}
      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="bg-black px-5 py-2.5 text-white disabled:opacity-60">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
