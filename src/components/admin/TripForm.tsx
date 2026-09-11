"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveTrip } from "@/lib/admin-actions";
import type { TripRecord } from "@/lib/queries";

export function TripForm({ trip }: { trip?: TripRecord }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      await saveTrip(formData);
      router.push("/admin/trips");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="mt-6 max-w-3xl space-y-4 border border-border bg-white p-6">
      <input type="hidden" name="id" defaultValue={trip?.id || ""} />
      <label className="block text-sm">
        Başlık
        <input name="title" required defaultValue={trip?.title} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Slug
        <input name="slug" required defaultValue={trip?.slug} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        İçerik
        <textarea name="content" rows={8} defaultValue={trip?.content} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Kapak görseli URL
        <input
          name="coverImage"
          defaultValue={trip?.coverImage || "/images/hero.svg"}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Sıra
        <input
          name="sortOrder"
          type="number"
          defaultValue={String(trip?.sortOrder ?? 0)}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={trip?.published ?? true} />
        Yayında
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="bg-black px-5 py-2.5 text-white disabled:opacity-60">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
