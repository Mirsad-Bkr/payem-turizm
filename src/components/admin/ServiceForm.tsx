"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveService } from "@/lib/admin-actions";
import type { ServiceRecord } from "@/lib/queries";

export function ServiceForm({ service }: { service?: ServiceRecord }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pricingDefault =
    service?.pricingTable?.map((r) => `${r.label} | ${r.price}`).join("\n") || "";

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      await saveService(formData);
      router.push("/admin/services");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="mt-6 max-w-3xl space-y-4 border border-border bg-white p-6">
      <input type="hidden" name="id" defaultValue={service?.id || ""} />
      <label className="block text-sm">
        Başlık
        <input
          name="title"
          required
          defaultValue={service?.title}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Slug
        <input
          name="slug"
          required
          defaultValue={service?.slug}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        İçerik
        <textarea
          name="content"
          rows={6}
          defaultValue={service?.content}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Fiyat tablosu (satır: Güzergâh | Fiyat)
        <textarea
          name="pricingTable"
          rows={5}
          defaultValue={pricingDefault}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Kapak görseli URL
        <input
          name="coverImage"
          defaultValue={service?.coverImage || "/images/hero.svg"}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Sıra
        <input
          name="sortOrder"
          type="number"
          defaultValue={String(service?.sortOrder ?? 0)}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={service?.published ?? true} />
        Yayında
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="bg-black px-5 py-2.5 text-white disabled:opacity-60">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
