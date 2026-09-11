"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

type Props = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  function goTo(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  }

  const slide = slides[index];
  if (!slide) return null;

  return (
    <section
      className="relative min-h-[70svh] overflow-hidden bg-black text-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((item, i) => (
        <div
          key={item.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={item.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" />

      <div className="relative mx-auto flex min-h-[70svh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:py-24 md:py-28">
        <h1
          key={`${slide.title}-title`}
          className="animate-fade-up break-words font-[family-name:var(--font-display)] text-3xl uppercase leading-[0.95] tracking-wide sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {slide.title}
        </h1>
        <p
          key={`${slide.title}-sub`}
          className="mt-4 max-w-xl animate-fade-up delay-1 text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg"
        >
          {slide.subtitle}
        </p>
        <div className="mt-8 animate-fade-up delay-2 sm:mt-9">
          <Link
            href={slide.ctaHref}
            className="inline-flex bg-white px-6 py-3.5 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.12em] text-black transition hover:bg-white/90 sm:px-7"
          >
            {slide.ctaLabel}
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-1 sm:bottom-8 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slayt ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center"
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Önceki"
        onClick={() => goTo(index - 1)}
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/30 text-xl backdrop-blur-sm transition hover:bg-black/50 sm:left-3"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Sonraki"
        onClick={() => goTo(index + 1)}
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/30 text-xl backdrop-blur-sm transition hover:bg-black/50 sm:right-3"
      >
        ›
      </button>
    </section>
  );
}
