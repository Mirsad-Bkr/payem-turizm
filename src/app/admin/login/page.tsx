"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-md border border-border bg-white p-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Admin Giriş</h1>
      <p className="mt-2 text-sm text-muted">Payem Turizm yönetim paneli</p>
      <label className="mt-6 block text-sm">
        E-posta
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full border border-border px-3 py-2"
          defaultValue="admin@payemtravel.com"
        />
      </label>
      <label className="mt-4 block text-sm">
        Şifre
        <input name="password" type="password" required className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-black py-3 text-sm uppercase tracking-wider text-white disabled:opacity-60"
      >
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
