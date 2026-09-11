import type { Metadata } from "next";
import { getPage } from "@/lib/queries";

export const metadata: Metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const page = await getPage("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
        Hakkımızda
      </h1>
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide sm:text-2xl">
        {page?.title}
      </h2>
      <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted">{page?.body}</p>
    </div>
  );
}
