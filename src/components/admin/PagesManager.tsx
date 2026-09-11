"use client";

import { useState } from "react";
import { savePage } from "@/lib/admin-actions";
import type { PageRecord } from "@/lib/queries";

export function PagesManager({ pages }: { pages: PageRecord[] }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mt-6 space-y-8">
      {pages.map((page) => (
        <form
          key={page.key}
          action={async (formData) => {
            setMessage("");
            setError("");
            try {
              await savePage(formData);
              setMessage(`${page.key} kaydedildi.`);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Kayıt başarısız");
            }
          }}
          className="space-y-3 border border-border bg-white p-6"
        >
          <input type="hidden" name="key" value={page.key} />
          <p className="text-xs uppercase tracking-wider text-muted">{page.key}</p>
          <label className="block text-sm">
            Başlık
            <input
              name="title"
              defaultValue={page.title}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            İçerik
            <textarea
              name="body"
              rows={8}
              defaultValue={page.body}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
          <button type="submit" className="bg-black px-4 py-2 text-white">
            Kaydet
          </button>
        </form>
      ))}
      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
