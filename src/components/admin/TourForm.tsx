"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveTour } from "@/lib/admin-actions";
import type { TourRecord } from "@/lib/queries";

export function TourForm({ tour }: { tour?: TourRecord }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(tour?.coverImage || "");
  const [uploading, setUploading] = useState(false);

  async function onCoverChange(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");
      setCoverImage(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Görsel yüklenemedi");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    formData.set("coverImage", coverImage);
    try {
      await saveTour(formData);
      router.push("/admin/tours");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="mt-6 max-w-3xl space-y-4 border border-border bg-white p-6">
      <input type="hidden" name="id" defaultValue={tour?.id || ""} />
      <Field label="Başlık" name="title" defaultValue={tour?.title} required />
      <Field label="Slug" name="slug" defaultValue={tour?.slug} required />
      <Field label="Özet" name="summary" defaultValue={tour?.summary} />
      <Field label="Destinasyon" name="destination" defaultValue={tour?.destination || ""} />
      <Field label="Fiyat" name="price" type="number" defaultValue={tour?.price?.toString() || ""} />
      <Field label="Para birimi" name="currency" defaultValue={tour?.currency || "TRY"} />

      <div className="block text-sm">
        <span className="font-medium">Kapak görseli</span>
        <input type="hidden" name="coverImage" value={coverImage} />
        <div className="mt-2">
          <label className="inline-flex cursor-pointer items-center bg-black px-5 py-2.5 text-sm uppercase tracking-wider text-white transition hover:bg-black/80">
            {uploading ? "Yükleniyor..." : "Dosya Seç"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading || loading}
              onChange={(e) => onCoverChange(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        {coverImage ? (
          <div className="relative mt-3 aspect-[1536/1296] w-full max-w-md overflow-hidden border border-border bg-surface">
            <Image src={coverImage} alt="Kapak önizleme" fill className="object-fill" />
          </div>
        ) : null}
      </div>

      <Field label="Sıra" name="sortOrder" type="number" defaultValue={String(tour?.sortOrder ?? 0)} />
      <TextArea
        label="Program (satır satır)"
        name="program"
        defaultValue={tour?.content.program.join("\n") || ""}
      />
      <TextArea
        label="Dahil (satır satır)"
        name="included"
        defaultValue={tour?.content.included.join("\n") || ""}
      />
      <TextArea
        label="Hariç (satır satır)"
        name="excluded"
        defaultValue={tour?.content.excluded.join("\n") || ""}
      />
      <TextArea
        label="Yanınıza alın (satır satır)"
        name="packingList"
        defaultValue={tour?.content.packingList?.join("\n") || ""}
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={tour?.featured} />
        Öne çıkan
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={tour?.published ?? true} />
        Yayında
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading || uploading} className="bg-black px-5 py-2.5 text-white disabled:opacity-60">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 w-full border border-border px-3 py-2"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      {label}
      <textarea name={name} rows={5} defaultValue={defaultValue} className="mt-1 w-full border border-border px-3 py-2" />
    </label>
  );
}
