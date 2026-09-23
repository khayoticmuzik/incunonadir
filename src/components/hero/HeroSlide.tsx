import Image from "next/image";
import type { FeaturedBook } from "@/data/featured-books";

type Props = {
  book: FeaturedBook;
  active: boolean;
  transitionMs: number;
};

export default function HeroSlide({ book, active, transitionMs }: Props) {
  return (
    <article
      aria-hidden={!active}
      aria-roledescription="slide"
      className={`absolute inset-0 transition-opacity ease-out ${
        active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      }`}
      style={{ transitionDuration: `${transitionMs}ms` }}
    >
      {/* Backdrop */}
      <Image
        src={book.backdropUrl}
        alt=""
        fill
        priority={active}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Layered gradients — heavier than typical to preserve OLED-dark mood */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:pb-32">
          <div className="max-w-2xl">
            <p className="mb-4 font-ui text-xs uppercase tracking-[0.35em] text-ember/80">
              Featured
            </p>

            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl md:text-6xl lg:text-7xl">
              {book.title}
            </h1>

            <p className="mt-6 max-w-xl font-reading text-base leading-relaxed text-parchment/75 sm:text-lg">
              {book.tagline}
            </p>

            <p className="mt-4 font-ui text-sm text-mist">
              by {book.author}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-ember bg-ember px-7 font-ui text-sm font-medium tracking-wide text-obsidian transition hover:bg-ember-dim hover:border-ember-dim"
              >
                Start Reading
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-fog px-7 font-ui text-sm font-medium tracking-wide text-parchment/85 transition hover:border-parchment/50 hover:text-parchment"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}