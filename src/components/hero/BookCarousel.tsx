"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { featuredBooks } from "@/data/featured-books";
import HeroSlide from "./HeroSlide";

const AUTO_ADVANCE_MS = 6000;
const TRANSITION_MS = 900;

export default function BookCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = featuredBooks.length;

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Auto-advance
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setTimeout(next, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, reducedMotion, next, index]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured dark fiction"
      className="relative w-full h-[88vh] min-h-[560px] overflow-hidden bg-obsidian"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {featuredBooks.map((book, i) => (
        <HeroSlide
          key={book.id}
          book={book}
          active={i === index}
          transitionMs={reducedMotion ? 0 : TRANSITION_MS}
        />
      ))}

      {/* Arrows — desktop only */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous featured book"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-fog/60 bg-ink/40 backdrop-blur-sm text-parchment/70 transition hover:border-ember/60 hover:text-ember"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next featured book"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-fog/60 bg-ink/40 backdrop-blur-sm text-parchment/70 transition hover:border-ember/60 hover:text-ember"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Indicators — thin vertical bars */}
      <div
        role="tablist"
        aria-label="Featured book indicators"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2"
      >
        {featuredBooks.map((book, i) => {
          const active = i === index;
          return (
            <button
              key={book.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Show ${book.title}`}
              onClick={() => go(i)}
              className={`transition-all duration-500 ease-out ${
                active
                  ? "h-8 w-[3px] bg-ember"
                  : "h-4 w-[2px] bg-mist/50 hover:bg-parchment/70"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}